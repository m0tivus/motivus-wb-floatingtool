import { eventChannel } from 'redux-saga'
const PROCESSING_PREFERENCE_COOKIE_ID = 'motivus_wb_pp'
const THREADS_PREFERENCE_COOKIE_ID = 'motivus_wb_pt'

export const setupWorker = (worker) =>
  eventChannel((emit) => {
    worker.onmessage = (event) => emit(event.data)
    try {
      worker.once('message', (data) => emit(data))
    } catch {
      //
    }
    worker.onerror = (e) => {
      console.log(e)
      console.log('erorrrrrr')
    }
    try {
      worker.on('error', (e) => {
        console.log(e)
        emit({
          body: {},
          stderr: btoa(e.toString()),
          stdout: null,
          exitCode: 1,
        })
      })
    } catch (e) {
      //
    }

    const unsubscribe = () => {
      worker.onmessage = null
      worker.onerror = null
    }
    return unsubscribe
  })

export const getProcessingPreferencesFromEnv = () => {
  if (typeof document === 'object') {
    return getProcessingPreferencesFromCookies()
  }
  return {
    startProcessing: true,
    threadCount: Number(process.env.PROCESSING_THREADS) || 1,
  }
}

export const getProcessingPreferencesFromCookies = () => {
  const preferences = {}
  const startProcessing = getCookie(PROCESSING_PREFERENCE_COOKIE_ID)
  if (startProcessing === 'true') {
    preferences.startProcessing = true
  } else {
    setCookie(PROCESSING_PREFERENCE_COOKIE_ID, false, 365)
    preferences.startProcessing = false
  }
  const threadCount = getCookie(THREADS_PREFERENCE_COOKIE_ID)
  if (threadCount > 0) {
    preferences.threadCount = Number(threadCount)
  } else {
    const defaultThreads = Math.floor(navigator.hardwareConcurrency / 2)
    preferences.threadCount = defaultThreads

    setCookie(THREADS_PREFERENCE_COOKIE_ID, defaultThreads, 365)
  }
  return preferences
}

export function setCookie(name, value, daysToLive) {
  // Encode value in order to escape semicolons, commas, and whitespace
  var cookie = name + '=' + encodeURIComponent(value)

  if (typeof daysToLive === 'number') {
    /* Sets the max-age attribute so that the cookie expires
        after the specified number of days */
    cookie += '; max-age=' + daysToLive * 24 * 60 * 60
  }
  if (typeof document === 'object') {
    document.cookie = cookie
  }
}

export function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = []
  if (typeof document === 'object') {
    cookieArr = document.cookie.split(';')
  }

  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split('=')

    /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
    if (name === cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1])
    }
  }

  // Return null if not found
  return null
}

export const updateThreadCountPreference = (value) =>
  setCookie(THREADS_PREFERENCE_COOKIE_ID, value, 365)

export const updateProcessingPreferenceCookie = (value) =>
  setCookie(PROCESSING_PREFERENCE_COOKIE_ID, value, 365)

export const createObjectURL = (blob) => {
  if (typeof window === 'object') {
    window.URL = window.URL || window.webkitURL
    return URL.createObjectURL(blob)
  }
}

export const createWorker = (loader, tid) => {
  if (typeof Worker === 'function') {
    var blob = new Blob([loader], { type: 'application/javascript' })
    return new Worker(createObjectURL(blob), {
      name: tid,
    })
  }
  const { Worker: NodeWorker } = require('worker_threads')
  return new NodeWorker(loader, { eval: true, env: {}, name: tid })
}
