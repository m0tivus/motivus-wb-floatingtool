import {
  START_PROCESSING,
  STOP_PROCESSING,
  END_PROCESSING,
  SET_RESULTS,
  SET_INPUT,
  SET_PROCESSING_PREFERENCES,
  WORKER_FINISHED_EXECUTION,
} from 'actions/types'

const INITIAL_STATE = {
  isProcessing: false,
  result: {},
  input: {},
  preferences: {},
  task: {},
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
      }
    }
    case END_PROCESSING: {
      return {
        ...state,
        input: INITIAL_STATE.input,
        result: INITIAL_STATE.result,
      }
    }
    case SET_RESULTS:
    case WORKER_FINISHED_EXECUTION:
      return {
        ...state,
        result: action.results,
        input: INITIAL_STATE.input,
        task: INITIAL_STATE.task,
      }
    case SET_PROCESSING_PREFERENCES:
      return {
        ...state,
        preferences: action.preferences,
      }
    default:
      return state
  }
}
