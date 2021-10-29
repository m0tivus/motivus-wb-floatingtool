import {
  END_PROCESSING,
  START_PROCESSING,
  STOP_PROCESSING,
  LOG_OUT_USER,
  SET_TOKEN,
  SET_THREAD_COUNT,
  SET_INPUT,
} from './types'

export const endProcessing = () => ({ type: END_PROCESSING })
export const startProcessing = () => ({ type: START_PROCESSING })
export const stopProcessing = () => ({ type: STOP_PROCESSING })
export const setThreadCount = (threadCount) => ({
  type: SET_THREAD_COUNT,
  threadCount,
})

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
})
export const logOutUser = () => ({ type: LOG_OUT_USER })
export const setInput = (payload, callback) => ({
  type: SET_INPUT,
  payload,
  callback,
})
