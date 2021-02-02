import {
  call,
  fork,
  put,
  take,
  select,
  cancel,
  takeEvery,
  delay,
  race,
} from 'redux-saga/effects'

import {
  startWS,
  setupSagaSocket,
  joinUserRoom,
  socketHeartbeat,
  sendResult,
  requestNewInput,
} from 'utils/api'
import {
  SOCKET_READY,
  SET_INPUT,
  SET_RESULT,
  SET_SOCKET_MESSAGE,
  SOCKET_CLOSED,
  STOP_PROCESSING,
  SET_STATS,
  SET_USER,
  REQUEST_NEW_INPUT,
} from 'actions/types'
import * as selectors from 'sagas/selectors'
import { ensureIsProcessing } from 'sagas/processing'
import { ensureUserLoaded } from 'sagas/user'

export function* main() {
  while (true) {
    let socketTask = yield fork(socketSaga)

    const termination = yield race({
      stoppedProcessing: take(STOP_PROCESSING),
      socketClosed: take(SOCKET_CLOSED),
      userUpdated: take(SET_USER),
    })
    yield cancel([socketTask])

    if (termination.socketClosed) {
      yield delay(4000)
    }
  }
}

export function* socketSaga() {
  yield call(ensureIsProcessing)
  yield call(ensureUserLoaded)

  try {
    const uuid = yield select(selectors.uuid)
    const userRoom = yield select(selectors.userRoom)

    const client = yield call(startWS, uuid)
    const feed = yield call(setupSagaSocket, client)

    const heartbeatTask = yield fork(heartbeatSaga, client)
    const inputRequestsTask = yield fork(handleInputRequests, client)

    yield call(joinUserRoom, client, userRoom)

    yield put({ type: SOCKET_READY })
    yield takeEvery(SET_RESULT, resultSaga, client)

    try {
      while (true) {
        const message = yield take(feed)
        const { event, payload } = message

        switch (event) {
          case 'input': {
            yield put({ type: SET_INPUT, payload })
            break
          }
          case 'stats': {
            yield put({ type: SET_STATS, stats: payload.body })
            break
          }
          case 'phx_reply':
          case 'presence_diff':
            break
          case 'phx_error': {
            console.error('backend error: ', message)
            break
          }
          default:
            yield put({ type: SET_SOCKET_MESSAGE, message })
        }
      }
    } finally {
      client.close()
      yield cancel([heartbeatTask, inputRequestsTask])
    }
  } finally {
    yield put({ type: SOCKET_CLOSED })
  }
}

// function* handleSocketClosed(socketTask) {
//   yield delay(4000)
//   socketTask = yield fork(socketSaga)
// }

function* heartbeatSaga(client) {
  while (true) {
    yield delay(5000)
    yield call(socketHeartbeat, client)
  }
}

function* handleInputRequests(client) {
  const userRoom = yield select(selectors.userRoom)
  yield takeEvery(REQUEST_NEW_INPUT, function* ({ tid }) {
    yield call(requestNewInput, client, userRoom, tid)
  })
}

function* resultSaga(client, { result, ref }) {
  const userRoom = yield select(selectors.userRoom)
  yield call(sendResult, client, result, userRoom, ref)
}

export function* ensureSocketReady() {
  const isSocketReady = yield select(selectors.isSocketReady)
  if (!isSocketReady) {
    yield take(SOCKET_READY)
  }
}
