import { fork } from 'redux-saga/effects'

import * as socketSaga from 'sagas/socket'
import * as userSaga from 'sagas/user'
import * as processingSaga from 'sagas/processing'
import * as statsSaga from 'sagas/stats'

export default function* main() {
  yield fork(userSaga.main)
  yield fork(socketSaga.main)
  yield fork(processingSaga.main)
  yield fork(statsSaga.main)
}
