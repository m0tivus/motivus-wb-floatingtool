import { call, put, fork, select, take, takeLatest } from 'redux-saga/effects'
import {
  LOG_OUT_USER,
  SET_TOKEN,
  SET_USER,
  UNSET_TOKEN,
  UNSET_USER,
  USER_LOADED,
} from 'actions/types'
import * as selectors from 'sagas/selectors'
import * as api from 'utils/api'
import { getCookie, setCookie } from 'utils/common'

export function* main() {
  yield takeLatest(SET_TOKEN, handleSetToken)
  yield takeLatest(LOG_OUT_USER, handleLogout)
  yield fork(getUserData)
}

export function* ensureUserLoaded() {
  const isUserLoaded = yield select(selectors.isUserLoaded)
  if (!isUserLoaded) {
    yield take(USER_LOADED)
  }
  return yield select(selectors.user)
}

export function* getUserData() {
  const token = yield call(getCookie, 'motivus_wb_token')
  if (token) {
    yield put({ type: SET_TOKEN, token, setOnly: true })
    yield* refreshUser()
  } else {
    const token = yield call(api.createGuestUser)
    yield put({ type: SET_TOKEN, token })
  }
}

function* handleSetToken(action) {
  const { token, setOnly } = action
  yield call(api.setAxiosToken, token)
  if (!setOnly) {
    yield call(setCookie, 'motivus_wb_token', token, 365)
    yield* refreshUser()
  }
}

function* refreshUser(user = null) {
  if (!user) {
    try {
      user = yield call(api.getUser)
    } catch {
      //
    }
  }
  if (!user) {
    yield call(handleLogout)
    return
  }
  yield put({ type: SET_USER, user })
  yield put({ type: USER_LOADED })
}

export function* handleLogout() {
  yield call(setCookie, 'motivus_wb_token', '', -1)
  yield call(api.setAxiosToken, null)

  yield put({ type: UNSET_TOKEN })
  yield put({ type: UNSET_USER })
  yield fork(getUserData)
}
