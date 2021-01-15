import { call, put, fork, select, take } from 'redux-saga/effects'
import axios from 'axios'
import { getUser } from 'utils/api'
import {
  SET_TOKEN,
  UNSET_TOKEN,
  SET_USER,
  TOGGLE_LOADING_USER,
  UNSET_USER,
  USER_LOADED,
} from 'actions/types'
import * as selectors from 'sagas/selectors'

export function* main() {
  // yield fork(getUserData)
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

export function* handleLogin({ token, router }) {
  yield put({ type: TOGGLE_LOADING_USER, value: true })
  yield localStorage.removeItem('referralUUID')
  yield localStorage.setItem('token', token)
  yield call(router.replace, '/dashboard')
  // yield call(cogoToast.success, 'You are now logged in')
  yield put({ type: UNSET_USER })
  yield fork(getUserData)
}

export function* handleLogout({ router }) {
  // cogoToast.loading('You are being logged out')
  yield put({ type: UNSET_USER })
  yield localStorage.removeItem('token')
  axios.defaults.headers.common['Authorization'] = ''
  yield put({ type: UNSET_TOKEN })
  if (router.location.pathname === '/dashboard') {
    router.push('/')
  }
  yield fork(getUserData)
}

export function* getUserData() {
  const token = yield localStorage.getItem('token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    yield put({ type: SET_TOKEN, token })
    try {
      const user = yield call(getUser)
      if (user) {
        yield put({ type: SET_USER, user })
      }
    } catch (e) {
      //
    }
  }
  yield put({ type: TOGGLE_LOADING_USER, value: false })
  yield put({ type: USER_LOADED })
}
