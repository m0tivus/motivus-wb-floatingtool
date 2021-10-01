import {
  SET_TOKEN,
  UNSET_TOKEN,
  SOCKET_READY,
  SOCKET_CLOSED,
  SET_USER,
  UNSET_USER,
} from 'actions/types'
import { v4 as uuidv4 } from 'uuid'

const INITIAL_STATE = {
  token: '',
  channelId: '',
  isSocketReady: false,
  isUserLoaded: false,
  isUserGuest: true,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.token }
    case UNSET_TOKEN:
      return { ...state, token: null }
    case SOCKET_READY:
      return {
        ...state,
        isSocketReady: true,
      }
    case SOCKET_CLOSED:
      return {
        ...state,
        isSocketReady: false,
      }
    case UNSET_USER:
      return {
        ...state,
        isSocketReady: false,
        channelId: '',
        isUserGuest: true,
      }
    case SET_USER:
      return {
        ...state,
        channelId: `room:worker:${action.user.uuid}:${uuidv4()}`,
        isUserLoaded: true,
        isUserGuest: action.user.is_guest,
      }
    default:
      return state
  }
}
