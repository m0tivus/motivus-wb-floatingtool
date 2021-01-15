import {
  call,
  fork,
  put,
  take,
  select,
  cancel,
  takeEvery,
  takeLatest,
  delay,
  cancelled,
} from 'redux-saga/effects'
import { v4 as uuidv4 } from 'uuid'

import {
  startWS,
  setupSagaSocket,
  joinUserRoom,
  socketHeartbeat,
  postResults,
} from 'utils/api'
import {
  SOCKET_READY,
  SET_INPUT,
  SET_RESULTS,
  SET_SOCKET_MESSAGE,
  SOCKET_CLOSED,
  STOP_PROCESSING,
} from 'actions/types'
import * as selectors from 'sagas/selectors'
import { ensureIsProcessing } from './processing'

const uuid = uuidv4()

export function* main() {
  while (true) {
    let socketTask = yield fork(socketSaga)
    yield takeLatest(SOCKET_CLOSED, handleSocketClosed, socketTask)
    yield take(STOP_PROCESSING)
    yield cancel([socketTask])
  }
}

export function* socketSaga() {
  yield call(ensureIsProcessing)

  try {
    const token = yield select(selectors.token)
    const userRoom = `room:worker:${uuid}`

    const client = yield call(startWS, token)
    const feed = yield call(setupSagaSocket, client)

    const heartbeatTask = yield fork(heartbeatSaga, client)

    yield call(joinUserRoom, client, userRoom)

    yield put({ type: SOCKET_READY })
    yield takeEvery(SET_RESULTS, resultsSaga, client)

    try {
      while (true) {
        const message = yield take(feed)
        const { event, payload } = message

        switch (event) {
          case SET_INPUT: {
            yield put({ type: SET_INPUT, payload })
            break
          }
          case 'phx_reply':
          case 'presence_diff':
            break
          case 'phx_error': {
            console.error('backend error: ', message)
            break
          }
          case 'new_msg': {
            yield put({ type: SET_INPUT, payload, client, userRoom })
            break
          }
          default:
            yield put({ type: SET_SOCKET_MESSAGE, message })
        }
      }
    } finally {
      client.close()
      yield cancel([heartbeatTask])
    }
  } finally {
    if (!cancelled()) {
      yield put({ type: SOCKET_CLOSED })
    }
  }
}

function* handleSocketClosed(socketTask) {
  yield cancel([socketTask])
  yield delay(4000)
  socketTask = yield fork(socketSaga)
}

function* heartbeatSaga(client) {
  while (true) {
    yield delay(5000)
    yield call(socketHeartbeat, client)
  }
}

function* resultsSaga(client, { results, ref }) {
  const userRoom = yield select(selectors.userRoom)
  yield call(postResults, client, results, userRoom, ref)
}

export function* ensureSocketReady() {
  const isSocketReady = yield select(selectors.isSocketReady)
  if (!isSocketReady) {
    yield take(SOCKET_READY)
  }
}
