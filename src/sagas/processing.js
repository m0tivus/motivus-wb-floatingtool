import {
  takeLatest,
  select,
  take,
  cancel,
  put,
  call,
  takeEvery,
  race,
} from 'redux-saga/effects'
import {
  SOCKET_CLOSED,
  START_PROCESSING,
  SET_INPUT,
  STOP_PROCESSING,
  SET_RESULT,
} from 'actions/types'
import * as selectors from 'sagas/selectors'
import {
  getProcessingPreferencesFromCookie,
  setupWorker,
  updateProcessingPreferenceCookie,
} from 'utils/common'

var Motivus = window.Motivus || {}

export function* main() {
  yield takeEvery([STOP_PROCESSING, START_PROCESSING], logProcessingEvent)
  yield takeEvery(
    [STOP_PROCESSING, START_PROCESSING],
    updateProcessingPreference,
  )
  yield call(getProcessingPreferences)
  yield takeLatest(SOCKET_CLOSED, endCurrentTask)
  yield takeLatest(SET_INPUT, handleNewInput)
}

function* handleNewInput({ payload }) {
  switch (payload.type) {
    case 'work': {
      let buffLoader = Buffer.from(payload.body.loader, 'base64')
      let buffWasm = Buffer.from(payload.body.wasm, 'base64')
      payload.body.buffWasm = buffWasm
      let loader = buffLoader.toString('ascii')
      switch (payload.body.run_type) {
        case 'wasm': {
          const { ref, client_id, task_id, body } = payload
          // URL.createObjectURL
          window.URL = window.URL || window.webkitURL

          var blob
          blob = new Blob([loader], { type: 'application/javascript' })
          var worker = new Worker(URL.createObjectURL(blob), {
            name: ref,
          })

          const workerMessages = yield call(setupWorker, worker)
          yield takeLatest(workerMessages, function* (result) {
            yield put({
              type: SET_RESULT,
              result: {
                body: result,
                type: 'response',
                ref,
                client_id,
                task_id,
              },
              ref,
            })
          })

          worker.postMessage(body)

          yield race([
            take(STOP_PROCESSING),
            take(SOCKET_CLOSED),
            take(SET_RESULT),
          ])
          worker.terminate()

          break
        }
        //case 'js': {
        //  eval(loader)
        //  const response = main(payload.body.params).then((x) => {
        //    console.log('terminó la promesa', x)
        //    channel.push(
        //      'new_msg',
        //      { body: x, type: 'response', ref: msg.ref },
        //      10000,
        //    )
        //  })
        //  //response = handleNewInput().then((x) => console.log("terminó la promesa", x));
        //  console.log('response promise', response)
        //  //channel.push("new_msg", {body: response, type: "response", ref: msg.ref}, 10000)
        //  break
        //}
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
  const startProcessing = yield call(getProcessingPreferencesFromCookie)
  if (startProcessing) {
    yield put({ type: START_PROCESSING, noInteraction: true })
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
      default:
    }
  }
}

export default main
