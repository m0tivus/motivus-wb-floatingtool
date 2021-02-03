import _ from 'lodash'
import {
  START_PROCESSING,
  STOP_PROCESSING,
  END_PROCESSING,
  SET_RESULT,
  SET_INPUT,
  SET_PROCESSING_PREFERENCES,
  REQUEST_NEW_INPUT,
  SOCKET_READY,
  SET_THREAD_COUNT,
} from 'actions/types'

const INITIAL_STATE = {
  isProcessing: false,
  result: {},
  input: {},
  preferences: {},
  task: {},
  slots: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_INPUT: {
      return {
        ...state,
        input: action.payload,
        task: {
          ...state.task,
          ref: action.payload.ref,
          started_on: new Date(),
        },
      }
    }
    case START_PROCESSING: {
      return {
        ...state,
        isProcessing: true,
        task: INITIAL_STATE.task,
      }
    }
    case STOP_PROCESSING: {
      return {
        ...state,
        isProcessing: false,
        task: INITIAL_STATE.task,
        slots: INITIAL_STATE.slots,
      }
    }
    case END_PROCESSING: {
      return {
        ...state,
        input: INITIAL_STATE.input,
        result: INITIAL_STATE.result,
      }
    }
    case SET_RESULT:
      return {
        ...state,
        result: action.result,
        input: INITIAL_STATE.input,
        task: INITIAL_STATE.task,
        slots: _(state.slots).without(action.tid).value(),
      }
    case SET_PROCESSING_PREFERENCES:
      return {
        ...state,
        preferences: action.preferences,
      }
    case SET_THREAD_COUNT:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          threadCount: action.threadCount,
        },
      }

    case REQUEST_NEW_INPUT:
      return {
        ...state,
        slots: [...state.slots, action.tid],
      }
    case SOCKET_READY:
      return {
        ...state,
        slots: INITIAL_STATE.slots,
      }
    default:
      return state
  }
}
