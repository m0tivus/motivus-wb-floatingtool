import { takeLatest, put } from 'redux-saga/effects'
import { UPDATE_STATS, SET_STATS } from 'actions/types'
import * as selectors from 'sagas/selectors'
import * as api from 'utils/api'

var Motivus = window.Motivus || {}

export function* main() {
  yield takeLatest(SET_STATS, handleNewInput)
}

function* handleNewInput({ payload: msg, client, userRoom }) {
  switch (msg.type) {
    case 'stats': {
      yield put({ type: UPDATE_STATS, stats: msg.body })
      break
    }
    case 'other': {
      console.log('other')
      break
    }
    default:
      break
  }
  yield
}

export default main
