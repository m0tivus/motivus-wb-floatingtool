import { fork } from 'redux-saga/effects'

import * as socketSaga from 'sagas/socket'
import * as userSaga from 'sagas/user'
import * as processingSaga from 'sagas/processing'

const clusterMode = process.env.CLUSTER_MODE || 'network'

export default function* main() {
  if (clusterMode === 'network') {
    yield fork(userSaga.main)
  }
  yield fork(socketSaga.main)
  yield fork(processingSaga.main)
}
