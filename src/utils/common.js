import createSagaMiddleware, { eventChannel, END } from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import loader from 'assemblyscript/lib/loader'
import { Buffer } from 'buffer'
import jpeg from 'jpeg-js'

import { COLORS } from 'utils/constants'

export const b64ToUint8CArray = (body) => {
    const jpegData = Buffer.from(body, 'base64')
    return jpeg.decode(jpegData, true)
}

export const drawCanvasFromArray = (canvas, dataArray) => {
    const { width, height, data } = dataArray
    const clampedArray = Uint8ClampedArray.from(data)
    const imageData = new ImageData(clampedArray, width, height)

    const ctx = canvas.getContext('2d')
    ctx.putImageData(imageData, 0, 0)
}

export const drawBoundingBoxes = (predictions, canvas) => {
    const ctx = canvas.getContext('2d')
    const font = '18px Titillium Web'
    ctx.font = font
    ctx.textBaseline = 'top'

    // ctx.clearRect(0, 0, canvas.width, canvas.height)

    predictions.forEach((prediction) => {
        const x = prediction.bbox[0]
        const y = prediction.bbox[1]
        const width = prediction.bbox[2]
        const height = prediction.bbox[3]

        const score = prediction.score.toFixed(2)

        // Draw the label background.
        ctx.fillStyle = COLORS[0]
        const textWidth = ctx.measureText(prediction.class).width
        const textHeight = parseInt(font, 10)
        // draw top left rectangle
        ctx.fillRect(x, y - textHeight - 4, textWidth + 5, textHeight + 3)
        const scoreWidth = ctx.measureText(score).width
        // draw bottom left rectangle
        ctx.fillRect(x, y + height, scoreWidth + 5, textHeight + 5)

        // Draw the bounding box.
        ctx.strokeStyle = COLORS[1]
        ctx.lineWidth = 1
        ctx.strokeRect(x, y, width, height)

        // Draw the text last to ensure it's on top.
        ctx.fillStyle = 'white'
        ctx.fillText(prediction.class, x + 1, y - textHeight - 2)
        ctx.fillText(score, x + 1, y + height + 5)
    })
}

export const drawBuffer = (canvas, buffer) => {
    const { width, height } = canvas
    const ctx = canvas.getContext('2d')
    const idata = ctx.createImageData(width, height)
    // set our buffer as source
    idata.data.set(buffer)
    // update canvas with new data
    ctx.putImageData(idata, 0, 0)
}

export const startWorker = (Worker) =>
    new Promise((resolve, reject) => {
        try {
            const worker = new Worker()
            resolve(worker)
        } catch (e) {
            reject(e.message)
        }
    })

export const setupWorker = (worker) =>
    eventChannel((emit) => {
        worker.onmessage = (event) => {
            emit(event.data)
        }
        worker.onclose = () => {
            emit(END)
        }
        const unsubscribe = () => {
            worker.onmessage = null
        }
        return unsubscribe
    })

export const setupWorkerSaga = () => {
    // create the saga middleware
    const sagaMiddleware = createSagaMiddleware()
    // mount it to store (not used)
    createStore(() => ({}), applyMiddleware(sagaMiddleware))
    return sagaMiddleware
}

export const loadModule = (location) =>
    loader.instantiateStreaming(fetch(location))
export const initWorker = (context) =>
    eventChannel((emit) => {
        context.onmessage = ({ data }) => emit(data)
        context.onclose = () => {
            emit(END)
        }
        const unsubscribe = () => {
            context.onmessage = null
        }
        return unsubscribe
    })
export const respondWith = (context, data) => context.postMessage(data)

export const validateEmail = (email) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)

export const addSchemeIfMissing = (link) =>
    link.startsWith('http') ? link : `https://${link}`
