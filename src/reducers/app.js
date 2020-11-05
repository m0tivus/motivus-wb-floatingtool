import {
  TOGGLE_LOADING_USER,
  SET_TOKEN,
  UNSET_TOKEN,
  SOCKET_READY,
  SOCKET_CLOSED,
  SET_USER,
  UNSET_USER,
  TOGGLE_LOADING,
  SET_RESPONSE_STATUS,
  SET_REFERRAL,
  SET_NODE_DASHBOARD_URL,
  SET_CLIENT_DASHBOARD_URL,
  SET_ROUTER,
  END_LOGIN_WAIT,
} from 'actions/types'

const INITIAL_STATE = {
  loadingUser: true,
  token: '',
  userRoom: `users:guest:${Date.now()}`,
  isSocketReady: false,
  isUserLoaded: false,
  isWaitingLogin: true,
  isLoading: false,
  isDone: false,
  isConnectionLost: false,
  referredBy: null,
  nodeDashboardUrl: '',
  clientDashboardUrl: '',
  router: {},
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_LOADING_USER:
      return { ...state, loadingUser: action.value }
    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: action.value,
        isDone: false,
      }
    case SET_RESPONSE_STATUS:
      return {
        ...state,
        isDone: action.success,
        isLoading: false,
      }
    case SET_TOKEN:
      return { ...state, token: action.token }
    case UNSET_TOKEN:
      return { ...state, token: null }
    case SOCKET_READY:
      return {
        ...state,
        isSocketReady: true,
        isConnectionLost: false,
      }
    case SOCKET_CLOSED:
      return {
        ...state,
        isSocketReady: false,
        isConnectionLost: true,
      }
    case UNSET_USER:
      return {
        ...state,
        isSocketReady: false,
        userRoom: `users:guest:${Date.now()}`,
        nodeDashboardUrl: '',
        clientDashboardUrl: '',
      }
    case SET_USER:
      return {
        ...state,
        userRoom: `users:${action.user.id}:${Date.now()}`,
        isUserLoaded: true,
      }
    case SET_REFERRAL:
      return {
        ...state,
        referredBy: action.uuid,
      }
    case SET_CLIENT_DASHBOARD_URL:
      return {
        ...state,
        clientDashboardUrl: action.url,
      }
    case SET_NODE_DASHBOARD_URL:
      return {
        ...state,
        nodeDashboardUrl: action.url,
      }
    case SET_ROUTER:
      return {
        ...state,
        router: action.router,
      }
    case END_LOGIN_WAIT:
      return {
        ...state,
        isWaitingLogin: false,
      }
    default:
      return state
  }
}
