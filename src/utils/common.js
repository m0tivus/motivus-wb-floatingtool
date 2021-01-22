import { eventChannel } from 'redux-saga'
const PROCESSING_PREFERENCE_COOKIE_ID = 'motivus_wb_pp'

export const setupWorker = (worker: Worker) =>
  eventChannel((emit) => {
    worker.onmessage = (event) => {
      emit(event.data)
    }
    worker.onerror = () => {
      console.log('erorrrrrr')
    }
    const unsubscribe = () => {
      worker.onmessage = null
      worker.onerror = null
    }
    return unsubscribe
  })

export const getProcessingPreferencesFromCookie = () => {
  const startProcessing = getCookie(PROCESSING_PREFERENCE_COOKIE_ID)
  if (startProcessing === 'true') {
    return startProcessing
  }
  setCookie(PROCESSING_PREFERENCE_COOKIE_ID, false, 365)
  return false
}

export function setCookie(name, value, daysToLive) {
  // Encode value in order to escape semicolons, commas, and whitespace
  var cookie = name + '=' + encodeURIComponent(value)

  if (typeof daysToLive === 'number') {
    /* Sets the max-age attribute so that the cookie expires
        after the specified number of days */
    cookie += '; max-age=' + daysToLive * 24 * 60 * 60
  }
  document.cookie = cookie
}

export function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(';')

  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split('=')

    /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1])
    }
  }

  // Return null if not found
  return null
}

export const updateProcessingPreferenceCookie = (value) =>
  setCookie(PROCESSING_PREFERENCE_COOKIE_ID, value, 365)
