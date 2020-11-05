import { combineReducers } from 'redux'
import processing from './processing'
import user from './user'
import app from './app'

export default combineReducers({
  processing,
  user,
  app,
})
