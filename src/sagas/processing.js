import { takeLatest, select, take, cancel, put, call } from 'redux-saga/effects'
import {
  END_PROCESSING,
  SOCKET_READY,
  SOCKET_CLOSED,
  START_PROCESSING,
  SET_INPUT,
  SET_PROCESSING_PREFERENCES,
} from 'actions/types'
import * as selectors from 'sagas/selectors'
import * as api from 'utils/api'

export function* main() {
  yield call(getProcessingPreferences)
  yield takeLatest(SOCKET_CLOSED, handleLostSocketConnection)
  yield takeLatest(SET_INPUT, handleNewInput)
}

function* handleNewInput({ payload: msg, client, userRoom }) {
  switch (msg.type) {
    case 'work': {
      console.log('work')
      let buffLoader = Buffer.from(msg.body.loader, 'base64')
      let loader = buffLoader.toString('ascii')
      switch (msg.body.run_type) {
        case 'wasm': {
          // URL.createObjectURL
          window.URL = window.URL || window.webkitURL

          var blob
          blob = new Blob([loader], { type: 'application/javascript' })
          var worker = new Worker(URL.createObjectURL(blob))

          worker.onmessage = function (e) {
            client.send(
              JSON.stringify({
                topic: userRoom,
                event: 'new_msg',
                payload: {
                  body: e.data,
                  type: 'response',
                  ref: msg.ref,
                  client_id: msg.client_id,
                },
                ref: msg.ref,
              }),
            )
          }
          worker.postMessage(msg.body.params)
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
    yield put({ type: START_PROCESSING })
  }
}

function* endCurrentTask() {
  const processingTask = yield select(selectors.currentTask)
  if (processingTask) {
    yield cancel([processingTask])
  }
}

function* handleLostSocketConnection() {
  yield put({ type: END_PROCESSING })
  yield call(endCurrentTask)
  yield take(SOCKET_READY)
}

export function* ensureIsProcessing() {
  const isProcessing = yield select(selectors.isProcessing)
  if (!isProcessing) {
    yield take(START_PROCESSING)
  }
}

export default main
