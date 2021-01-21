import { combineReducers } from 'redux'
import processing from './processing'
import user from './user'
import app from './app'
import stats from './stats'

export default combineReducers({
  processing,
  user,
  app,
  stats,
})
