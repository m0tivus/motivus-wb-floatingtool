import { eventChannel } from 'redux-saga'

export const setupWorker = (worker: Worker) =>
  eventChannel((emit) => {
    worker.onmessage = (event) => {
      emit(event.data)
    }
    worker.onerror = () => {
      console.log('erorrrrrr')
    }
    const unsubscribe = () => {
      worker.onmessage = null
      worker.onerror = null
    }
    return unsubscribe
  })
