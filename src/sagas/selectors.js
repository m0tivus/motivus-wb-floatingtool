export const inputElement = ({ processing: { inputSource } }) => inputSource
export const slots = ({ processing: { slots } }) => slots
export const threadCount = ({
  processing: {
    preferences: { threadCount },
  },
}) => threadCount
export const isProcessing = ({ processing: { isProcessing } }) => isProcessing
export const isLoadingModel = ({ processing: { isLoadingModel } }) =>
  isLoadingModel
export const token = ({ app: { token } }) => token
export const socketClient = ({ app: { socketClient } }) => socketClient
export const isSocketReady = ({ app: { isSocketReady } }) => isSocketReady
export const channelId = ({ app: { channelId } }) => channelId
export const isUserLoaded = ({ app: { isUserLoaded } }) => isUserLoaded
export const currentSaga = ({ processing: { currentSaga } }) => currentSaga
export const currentTask = ({ processing: { currentTask } }) => currentTask
export const currentProcessing = ({ processing: { currentProcessing } }) =>
  currentProcessing
export const useCases = ({ useCases }) => useCases
export const user = ({ user }) => user
export const uuid = ({ user: { uuid } }) => uuid
export const router = ({ app: { router } }) => router
