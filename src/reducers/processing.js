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
  SOCKET_CLOSED,
  ABORT_TASK,
} from 'actions/types'

const INITIAL_STATE = {
  isProcessing: false,
  result: {},
  input: {},
  preferences: {},
  task: {},
  tasks: {},
  slots: [],
  last_result_datetime: null,
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
        tasks: {
          ...state.tasks,
          [action.payload.tid]: true,
        },
      }
    }
    case START_PROCESSING: {
      return {
        ...state,
        isProcessing: true,
        task: INITIAL_STATE.task,
        last_result_datetime: new Date(),
      }
    }
    case STOP_PROCESSING: {
      return {
        ...state,
        isProcessing: false,
        task: INITIAL_STATE.task,
        tasks: INITIAL_STATE.tasks,
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
        tasks: _(state.tasks).omit(action.tid).value(),
        last_result_datetime: new Date(),
      }
    case ABORT_TASK:
      return {
        ...state,
        result: action.result,
        input: INITIAL_STATE.input,
        task: INITIAL_STATE.task,
        slots: _(state.slots).without(action.tid).value(),
        tasks: _(state.tasks).omit(action.tid).value(),
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
    case SOCKET_CLOSED:
      return {
        ...state,
        tasks: INITIAL_STATE.tasks,
      }
    default:
      return state
  }
}
