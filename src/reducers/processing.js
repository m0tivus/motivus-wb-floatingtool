import {
    START_LOADING_MODEL,
    DONE_LOADING_MODEL,
    START_PROCESSING,
    STOP_PROCESSING,
    END_PROCESSING,
    SET_INPUT_SOURCE,
    SET_RESULTS,
    INIT_PROCESSING,
    SET_CURRENT_PROCESSING,
    SET_INPUT,
    CREATE_DEFAULT_BATCH,
} from 'actions/types'

const INITIAL_STATE = {
    isLoadingModel: false,
    isProcessing: false,
    isWaitingDefaultInput: false,
    inputSource: null,
    result: {},
    currentSaga: null,
    currentTask: null,
    currentProcessing: null,
    input: {},
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
    case INIT_PROCESSING: {
        return {
            ...state,
            isLoadingModel: false,
        }
    }
    case SET_CURRENT_PROCESSING: {
        return {
            ...state,
            currentTask: action.task,
            currentSaga: action.saga,
            currentProcessing: action.id,
        }
    }
    case SET_INPUT: {
        return {
            ...state,
            input: action.payload,
            isWaitingDefaultInput: false,
        }
    }
    case START_LOADING_MODEL: {
        return {
            ...state,
            isLoadingModel: true,
        }
    }
    case DONE_LOADING_MODEL: {
        return {
            ...state,
            isLoadingModel: false,
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
            currentSaga: INITIAL_STATE.currentSaga,
            currentTask: INITIAL_STATE.currentTask,
        }
    }
    case SET_INPUT_SOURCE:
        return {
            ...state,
            inputSource: action.source,
        }
    case SET_RESULTS:
        return {
            ...state,
            result: action.results,
        }
    case CREATE_DEFAULT_BATCH:
        return {
            ...state,
            isWaitingDefaultInput: true,
        }
    default: return state 
    }
}
