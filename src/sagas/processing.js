import {
  takeLatest,
  spawn,
  select,
  take,
  cancel,
  put,
  call,
} from 'redux-saga/effects'
import {
  INIT_PROCESSING,
  INIT_PROCESSING_BY_ID,
  END_PROCESSING,
  SOCKET_READY,
  SOCKET_CLOSED,
  SET_CURRENT_PROCESSING,
  SET_USE_CASES,
  START_PROCESSING,
  SET_INPUT,
  SET_RESULTS,
} from 'actions/types'
import * as selectors from 'sagas/selectors'
import { DEFAULT_PROCESSING_ID } from 'utils/constants'
import { ensureSocketReady } from 'sagas/socket'

export function* main() {
  yield takeLatest(INIT_PROCESSING, handleSaga)
  yield takeLatest(INIT_PROCESSING_BY_ID, initSagaById)
  yield takeLatest(SOCKET_CLOSED, handleLostSocketConnection)
  yield takeLatest(SET_INPUT, handleNewInput)
  // yield call(startDefault)
}

function* returnResult(x, ref) {
  yield put({
    type: SET_RESULTS,
    results: x,
    ref: {
      ref: ref,
      topic: 'new_msg',
    },
  })
}

const appendScript = (scriptToAppend) => {
  const script = document.createElement('script')
  script.text = scriptToAppend
  document.body.appendChild(script)
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

          // let buffWasm = Buffer.from(msg.body.wasm, 'base64')
          // appendScript(loader)
          // eval(loader)
          //response = main(buffWasm, msg.body.params);
          // const loader = require(`data:text/javascript;charset=utf-8;base64,${msg.body.loader}`)
          // window.handleNewInput((y) => returnResult(y, msg.ref))
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

function* handleSaga({ saga, id, force = false }) {
  yield call(ensureSocketReady)

  const currentProcessingId = yield select(selectors.currentProcessing)
  const isAnotherSaga = currentProcessingId !== id
  if ((saga && isAnotherSaga) || force) {
    yield put({ type: END_PROCESSING })
    yield call(endCurrentTask)

    const task = yield spawn(saga)
    yield put({
      type: SET_CURRENT_PROCESSING,
      task,
      saga,
      id,
    })
  }
}

function* initSagaById({ id }) {
  const currentProcessingId = yield select(selectors.currentProcessing)
  if (currentProcessingId !== id) {
    const { byId } = yield select(selectors.useCases)
    if (typeof byId[id] === 'undefined') {
      yield take(SET_USE_CASES)
      yield call(initSagaById, { id })
    } else {
      const { saga } = byId[id]
      yield put({ type: INIT_PROCESSING, saga, id })
    }
  }
}
function* restartSaga(id) {
  const { byId } = yield select(selectors.useCases)
  if (typeof byId[id] === 'undefined') {
    yield take(SET_USE_CASES)
  }
  const { saga } = byId[id]
  yield put({ type: INIT_PROCESSING, saga, id, force: true })
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

  const id = yield select(selectors.currentProcessing)
  yield call(restartSaga, id)
}

function* startDefault() {
  yield call(initSagaById, { id: DEFAULT_PROCESSING_ID })
}

export function* ensureIsProcessing() {
  const isProcessing = yield select(selectors.isProcessing)
  if (!isProcessing) {
    yield take(START_PROCESSING)
  }
}

export default main
