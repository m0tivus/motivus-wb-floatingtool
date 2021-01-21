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
  SOCKET_READY,
  SOCKET_CLOSED,
  START_PROCESSING,
  SET_INPUT,
  SET_PROCESSING_PREFERENCES,
  STOP_PROCESSING,
  WORKER_FINISHED_EXECUTION,
} from 'actions/types'
import * as selectors from 'sagas/selectors'
import * as api from 'utils/api'
import { setupWorker } from 'utils/common'

var Motivus = window.Motivus || {}

export function* main() {
  yield takeEvery(START_PROCESSING, logStartProcessingEvent)
  // yield call(getProcessingPreferences)
  yield takeLatest(SOCKET_CLOSED, endCurrentTask)
  yield takeLatest(SET_INPUT, handleNewInput)
}

function* handleNewInput({ payload: msg, client, userRoom }) {
  switch (msg.type) {
    case 'work': {
      let buffLoader = Buffer.from(msg.body.loader, 'base64')
      let buffWasm = Buffer.from(msg.body.wasm, 'base64')
      msg.body.buffWasm = buffWasm
      let loader = buffLoader.toString('ascii')
      switch (msg.body.run_type) {
        case 'wasm': {
          // URL.createObjectURL
          window.URL = window.URL || window.webkitURL

          var blob
          blob = new Blob([loader], { type: 'application/javascript' })
          var worker = new Worker(URL.createObjectURL(blob), {
            name: msg.ref,
          })

          const workerMessages = yield call(setupWorker, worker)
          yield takeLatest(workerMessages, function* (result) {
            yield put({
              type: WORKER_FINISHED_EXECUTION,
              result,
              ref: msg.ref,
            })

            yield call(
              api.sendThroughSocket,
              client,
              userRoom,
              'new_msg',
              {
                body: result,
                type: 'response',
                ref: msg.ref,
                client_id: msg.client_id,
                task_id: msg.task_id,
              },
              msg.ref,
            )
          })

          worker.postMessage(msg.body)

          yield race([
            take(STOP_PROCESSING),
            take(SOCKET_CLOSED),
            take(WORKER_FINISHED_EXECUTION),
          ])
          worker.terminate()

          break
        }
        //case 'js': {
        //  eval(loader)
        //  const response = main(msg.body.params).then((x) => {
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
  const { data: preferences } = yield call(api.getProcessingPreferences)
  yield put({ type: SET_PROCESSING_PREFERENCES, preferences })
  if (preferences.processing_allowed) {
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

function logStartProcessingEvent({ noInteraction = false }) {
  if (Motivus.gaTrackEvent) {
    Motivus.gaTrackEvent({
      category: 'Processing',
      action: 'Start',
      label: 'Processing approved',
      noInteraction,
    })
  }
}

export default main
