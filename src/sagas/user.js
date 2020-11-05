import {
  call,
  put,
  fork,
  takeLatest,
  select,
  delay,
  take,
  race,
} from 'redux-saga/effects'
import axios from 'axios'
import { getUser, getNodeDashboard, getClientDashboard } from 'utils/api'
import {
  SET_TOKEN,
  UNSET_TOKEN,
  SET_USER,
  TOGGLE_LOADING_USER,
  UNSET_USER,
  USER_LOADED,
  USER_LOGGED_IN,
  LOG_OUT_USER,
  SET_REFERRAL,
  SET_NODE_DASHBOARD_URL,
  SET_CLIENT_DASHBOARD_URL,
  END_LOGIN_WAIT,
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

function* handleReferral({ uuid, router, silent }) {
  const token = yield select(selectors.token)
  if (!token) {
    yield localStorage.setItem('referralUUID', uuid)
    if (!silent) {
      yield call(router.replace, '/')
      // yield call(
      //   cogoToast.success,
      //   `You have been invited to create an account,
      //           log in to continue`,
      // )
    }
  } else {
    if (!silent) {
      // yield call(cogoToast.error, 'Only unregistered users can be referred')
    }
  }
}

function* loadReferral() {
  const uuid = yield localStorage.getItem('referralUUID')
  if (uuid) {
    yield put({ type: SET_REFERRAL, uuid, silent: true })
  }
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

function* waitForLogin() {
  const user = yield call(ensureUserLoaded)
  if (!user.id) {
    const { userLoggedIn } = yield race({
      userLoggedIn: take(USER_LOGGED_IN),
      timeout: delay(1000),
    })
    if (userLoggedIn) {
      yield take(SET_USER)
    }
  }
  yield put({ type: END_LOGIN_WAIT })
}

function* updateDashboards() {
  yield fork(updateUserDashboard)
  yield fork(updateClientDashboard)
}

function* updateClientDashboard() {
  try {
    const {
      data: {
        data: { dashboard_url },
      },
    } = yield call(getClientDashboard)
    yield put({ type: SET_CLIENT_DASHBOARD_URL, url: dashboard_url })
  } catch (e) {
    //
  }
}

function* updateUserDashboard() {
  try {
    const {
      data: {
        data: { dashboard_url },
      },
    } = yield call(getNodeDashboard)
    yield put({ type: SET_NODE_DASHBOARD_URL, url: dashboard_url })
  } catch (e) {
    //
  }
}

function* keepDashboardsUpdated() {
  while (true) {
    yield call(updateDashboards)
    yield race({
      tick: delay(180000),
      tokenSetted: take(SET_TOKEN),
    })
  }
}
