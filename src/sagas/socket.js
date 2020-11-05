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
} from 'redux-saga/effects'
import { v4 as uuidv4 } from 'uuid'

import {
  startWS,
  setupSagaSocket,
  joinUserRoom,
  socketHeartbeat,
  subscribeToTopic,
  unsubscribeOfTopics,
  postResults,
} from 'utils/api'
import {
  USER_LOADED,
  SOCKET_READY,
  SET_INPUT,
  SUBSCRIBE_TO_TOPIC,
  UNSUBSCRIBE_TOPICS,
  SET_RESULTS,
  SET_SOCKET_MESSAGE,
  SOCKET_CLOSED,
} from 'actions/types'
import * as selectors from 'sagas/selectors'
import { ensureUserLoaded } from 'sagas/user'

export function* main() {
  let socketTask = yield fork(socketSaga)
  yield takeLatest(SOCKET_CLOSED, handleSocketClosed, socketTask)
}

export function* socketSaga() {
  // yield call(ensureUserLoaded)

  try {
    const token = yield select(selectors.token)
    // const userRoom = yield select(selectors.userRoom)
    let uuid = uuidv4()
    const userRoom = `room:worker:${uuid}`

    const client = yield call(startWS, token)
    const feed = yield call(setupSagaSocket, client)

    yield takeLatest(USER_LOADED, () => {
      client.close()
      feed.close()
    })

    const heartbeatTask = yield fork(heartbeatSaga, client)

    yield call(joinUserRoom, client, userRoom)

    yield fork(handleSubscriptions, client, userRoom)

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
    yield put({ type: SOCKET_CLOSED })
  }
}

function* handleSubscriptions(client, userRoom) {
  yield takeEvery(SUBSCRIBE_TO_TOPIC, function* ({ topic }) {
    yield call(subscribeToTopic, client, userRoom, topic)
  })
  yield takeEvery(UNSUBSCRIBE_TOPICS, function* () {
    yield call(unsubscribeOfTopics, client, userRoom)
  })
}

function* handleSocketClosed(socketTask) {
  yield cancel([socketTask])
  yield delay(4000)
  socketTask = yield fork(socketSaga)
}

function* heartbeatSaga(client) {
  while (true) {
    yield delay(1000)
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
