import {
  START_PROCESSING,
  STOP_PROCESSING,
  END_PROCESSING,
  SET_RESULTS,
  SET_INPUT,
  SET_PROCESSING_PREFERENCES,
} from 'actions/types'

const INITIAL_STATE = {
  isProcessing: false,
  result: {},
  input: {},
  preferences: {},
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_INPUT: {
      return {
        ...state,
        input: action.payload,
      }
    }
    case START_PROCESSING: {
      return {
        ...state,
        isProcessing: true,
      }
    }
    case STOP_PROCESSING: {
      return {
        ...state,
        isProcessing: false,
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
      return {
        ...state,
        result: action.results,
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
