import { SET_USER, UNSET_USER } from 'actions/types'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user
    case UNSET_USER:
      return INITIAL_STATE
    default:
      return state
  }
}
