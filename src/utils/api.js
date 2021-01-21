import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { eventChannel, END } from 'redux-saga'
import axios from 'axios'

const apiHost = process.env.REACT_APP_API_HOST || 'api.motivus.cl'
const host = process.env.REACT_APP_HOST || 'motivus.cl'
const httpScheme = process.env.REACT_APP_TLS === 'true' ? 'https' : 'http'
const wsScheme = process.env.REACT_APP_TLS === 'true' ? 'wss' : 'ws'

const wsBase = `${wsScheme}://${apiHost}`
const httpBase = `${httpScheme}://${apiHost}`

export const getInviteLink = (uid) => `${httpScheme}://${host}?referral=${uid}`

export const postContactForm = (data) =>
  axios.post(`${httpBase}/api/email`, data, {
    headers: { 'Content-Type': 'text/plain' },
  })

export const getUser = () =>
  axios.get(`${httpBase}/api/user`).then(({ data }) => data.data)

export const createGuestUser = () =>
  axios.post(`${httpBase}/api/users/guest`).then(({ data }) => data.user)

export const startWS = (
  uuid = null,
  url = process.env.REACT_APP_WS_URL || `${wsBase}/socket/websocket`,
) =>
  new Promise((resolve, reject) => {
    let urlWithParams = url
    if (uuid) {
      urlWithParams += `?uuid=${uuid}`
    }
    const socket = new W3CWebSocket(urlWithParams)
    socket.onopen = () => resolve(socket)
    socket.onerror = (evt) => reject(evt)
  })

export const setupSagaSocket = (client) =>
  eventChannel((emit) => {
    client.onmessage = (event) => {
      emit(JSON.parse(event.data))
    }
    client.onclose = () => {
      emit(END)
    }
    const unsubscribe = () => {
      client.onmessage = null
    }
    return unsubscribe
  })

export const sendThroughSocket = (
  client,
  topic,
  event,
  payload = {},
  ref = null,
) =>
  client.send(
    JSON.stringify({
      topic,
      event,
      payload,
      ref,
    }),
  )

export const socketHeartbeat = (client) =>
  sendThroughSocket(client, 'phoenix', 'heartbeat')

export const joinUserRoom = (client, userRoom) =>
  sendThroughSocket(client, userRoom, 'phx_join')

export const subscribeToTopic = (client, userRoom, topic) =>
  sendThroughSocket(client, userRoom, 'subscribe', { topic })
export const unsubscribeOfTopics = (client, userRoom) =>
  sendThroughSocket(client, userRoom, 'unsubscribe')

export const postResults = (client, results, room = 'room:lobby', ref = null) =>
  sendThroughSocket(client, room, 'output', { results }, ref)

export const getBatches = (appId) =>
  axios.get(`${httpBase}/applications/${appId}/batch`)
export const getBatchResults = (appId, batchId) =>
  axios.get(`${httpBase}/applications/${appId}/batch/${batchId}`)
export const getThreadResults = (appId, threadId) =>
  axios.get(`${httpBase}/applications/${appId}/thread/${threadId}`)
export const getJobThreads = (appId, batchId) =>
  axios.get(`${httpBase}/applications/${appId}/batches/${batchId}/threads`)
export const getNodeCount = () => axios.get(`${httpBase}/webpage/metrics`)
export const getGeoUsers = () => axios.get(`${httpBase}/webpage/metrics/geo`)
export const postBatch = (appId, data) =>
  axios.post(`${httpBase}/applications/${appId}/batch`, data, {
    headers: { 'Content-Type': 'application/json' },
  })
export const deleteBatch = (appId, batchId) =>
  axios.delete(`${httpBase}/applications/${appId}/batch/${batchId}`)
export const deleteThread = (appId, threadId) =>
  axios.delete(`${httpBase}/applications/${appId}/thread/${threadId}`)
export const postDefaultBatch = () =>
  axios.post(`${httpBase}/applications/1/batch/default`, {})
export const getMetabasePublicStats = () =>
  axios.get(`${httpBase}/api/metabase/stats/public`)
export const getNodeDashboard = () =>
  axios.get(`${httpBase}/api/metabase/embed/node`)
export const getClientDashboard = () =>
  axios.get(`${httpBase}/api/metabase/embed/client`)

export const getProcessingPreferences = () =>
  axios.get(`${httpBase}/api/user/processing_preferences`, {
    withCredentials: true,
  })
