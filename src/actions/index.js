import {
    SEND_CONTACT_FORM,
    SET_DATE,
    INIT_PROCESSING_BY_ID,
    SET_INPUT_SOURCE,
    END_PROCESSING,
    START_PROCESSING,
    STOP_PROCESSING,
    SET_CAPTCHA_RESULT,
    LOG_OUT_USER,
    USER_LOGGED_IN,
    QUEUE_JOB,
    START_RECURRENT_UPDATE,
    STOP_RECURRENT_UPDATE,
    SET_REFERRAL,
    REMOVE_DATATABLE_ITEM,
    CREATE_DEFAULT_BATCH,
    TRIGGER_DASHBOARD_UPDATE,
} from './types'

export const setDate = (date) => ({ type: SET_DATE, date })

export const initProcessingById = (useCaseId) => ({
    type: INIT_PROCESSING_BY_ID,
    id: useCaseId,
})
export const setProcessingInput = (source) => ({
    type: SET_INPUT_SOURCE,
    source,
})
export const endProcessing = () => ({ type: END_PROCESSING })
export const startProcessing = () => ({ type: START_PROCESSING })
export const stopProcessing = () => ({ type: STOP_PROCESSING })

export const submitContactForm = (data) => ({ type: SEND_CONTACT_FORM, data })
export const handleCaptcha = (result) => ({ type: SET_CAPTCHA_RESULT, result })

export const logInUser = (token, router) => ({
    type: USER_LOGGED_IN,
    token,
    router,
})
export const logOutUser = (router) => ({ type: LOG_OUT_USER, router })

export const submitNewBatch = (data, router, appId) => ({
    type: QUEUE_JOB,
    data,
    router,
    appId,
})

export const startRecurrentUpdate = (getter) => ({
    type: START_RECURRENT_UPDATE,
    getter,
})
export const stopRecurrentUpdate = () => ({ type: STOP_RECURRENT_UPDATE })
export const removeDatatableItem = (id, key) => ({
    type: REMOVE_DATATABLE_ITEM,
    id,
    key,
})

export const setReferral = (uuid, router) => ({
    type: SET_REFERRAL,
    uuid,
    router,
})

export const createDefaultBatch = () => ({ type: CREATE_DEFAULT_BATCH })
export const triggerDashboardUpdate = () => ({ type: TRIGGER_DASHBOARD_UPDATE })
