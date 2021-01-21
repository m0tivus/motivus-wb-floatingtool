import { call, put, fork, select, take } from 'redux-saga/effects'
import { SET_USER, USER_LOADED } from 'actions/types'
import * as selectors from 'sagas/selectors'
import * as api from 'utils/api'

export function* main() {
  yield fork(getUserData)
  // yield fork(loadReferral)
  // yield fork(waitForLogin)
  // yield fork(keepDashboardsUpdated)
  // yield takeLatest(USER_LOGGED_IN, handleLogin)
  // yield takeLatest(LOG_OUT_USER, handleLogout)
  // yield takeLatest(SET_REFERRAL, handleReferral)
}

export function* ensureUserLoaded() {
  const isUserLoaded = yield select(selectors.isUserLoaded)
  if (!isUserLoaded) {
    yield take(USER_LOADED)
  }
  return yield select(selectors.user)
}

export function* getUserData() {
  const user = yield call(api.createGuestUser)
  yield put({ type: SET_USER, user })
  yield put({ type: USER_LOADED })
}
