import {
  takeLatest,
  select,
  take,
  cancel,
  put,
  call,
  takeEvery,
  race,
  fork,
  takeLeading,
} from 'redux-saga/effects'
import {
  SOCKET_CLOSED,
  START_PROCESSING,
  SET_INPUT,
  STOP_PROCESSING,
  SET_RESULT,
  REQUEST_NEW_INPUT,
  SOCKET_READY,
  SET_PROCESSING_PREFERENCES,
  SET_THREAD_COUNT,
  ABORT_TASK,
} from 'actions/types'
import * as selectors from 'sagas/selectors'
import {
  createWorker,
  getProcessingPreferencesFromEnv,
  setupWorker,
  updateProcessingPreferenceCookie,
  updateThreadCountPreference,
} from 'utils/common'
import { ensureSocketReady } from './socket'
import { v4 as uuidv4 } from 'uuid'

var Motivus = (typeof window === 'object' && window.Motivus) || {}

export function* main() {
  yield takeEvery([STOP_PROCESSING, START_PROCESSING], logProcessingEvent)
  yield takeEvery(
    [STOP_PROCESSING, START_PROCESSING, SET_THREAD_COUNT],
    updateProcessingPreference,
  )
  yield takeLatest(SOCKET_CLOSED, endCurrentTask)
  yield takeEvery(SET_INPUT, handleNewInput)
  yield fork(getProcessingPreferences)
  yield takeLeading(
    [START_PROCESSING, SET_RESULT, SOCKET_READY, SET_THREAD_COUNT, ABORT_TASK],
    askForInputs,
  )
}

function* handleNewInput({ payload, callback = () => null }) {
  switch (payload.type) {
    case 'work': {
      let buffLoader = Buffer.from(payload.body.loader, 'base64')
      let buffWasm = Buffer.from(payload.body.wasm, 'base64')
      payload.body.buffWasm = buffWasm
      let loader = buffLoader.toString('ascii')
      switch (payload.body.run_type) {
        case 'wasm': {
          const { body, tid } = payload

          var worker = createWorker(loader, tid)

          const workerMessages = yield call(setupWorker, worker)
          yield takeLatest(workerMessages, function* (result) {
            yield put({
              type: SET_RESULT,
              result: {
                ...result,
                tid,
              },
              tid,
            })
            yield call(callback, result)
          })

          worker.postMessage(body)

          while (true) {
            const winner = yield race({
              stoppedProcessing: take(STOP_PROCESSING),
              socketClosed: take(SOCKET_CLOSED),
              result: take(SET_RESULT),
              abort: take(ABORT_TASK),
            })
            if (winner.abort) {
              if (winner.abort.tid === tid) {
                worker.terminate()
                break
              } else {
                continue
              }
            }
            if (winner.result) {
              if (winner.result.tid === tid) {
                worker.terminate()
                break
              } else {
                continue
              }
            } else {
              worker.terminate()
              break
            }
          }
          break
        }
        default:
          break
      }
      break
    }
    default:
      break
  }
  yield
}

function* getProcessingPreferences() {
  const { startProcessing, threadCount } = yield call(
    getProcessingPreferencesFromEnv,
  )
  yield put({
    type: SET_PROCESSING_PREFERENCES,
    preferences: { startProcessing, threadCount },
  })

  if (startProcessing) {
    yield put({ type: START_PROCESSING, noInteraction: true })
  }
}

function* askForInputs() {
  yield call(ensureSocketReady)
  yield call(ensureIsProcessing)

  const threadCount = yield select(selectors.threadCount)
  const slots = yield select(selectors.slots)

  for (let t = slots.length; t < threadCount; t++) {
    const uuid = uuidv4()
    yield put({ type: REQUEST_NEW_INPUT, tid: uuid })
  }
}

function* endCurrentTask() {
  const processingTask = yield select(selectors.currentTask)
  if (processingTask) {
    yield cancel([processingTask])
  }
}

export function* ensureIsProcessing() {
  const isProcessing = yield select(selectors.isProcessing)
  if (!isProcessing) {
    yield take(START_PROCESSING)
  }
}

function logProcessingEvent({ type, noInteraction = false }) {
  if (Motivus.gaTrackEvent) {
    switch (type) {
      case START_PROCESSING:
        Motivus.gaTrackEvent({
          category: 'Processing',
          action: 'Start',
          label: 'Processing approved',
          noInteraction,
        })
        break
      case STOP_PROCESSING:
        Motivus.gaTrackEvent({
          category: 'Processing',
          action: 'Stop',
          label: 'Processing stopped',
          noInteraction,
        })
        break
      default:
    }
  }
}

function* updateProcessingPreference(action) {
  if (!action.noInteraction) {
    switch (action.type) {
      case START_PROCESSING:
        yield call(updateProcessingPreferenceCookie, true)
        break
      case STOP_PROCESSING:
        yield call(updateProcessingPreferenceCookie, false)
        break
      case SET_THREAD_COUNT:
        yield call(updateThreadCountPreference, action.threadCount)
        break
      default:
    }
  }
}

export default main
