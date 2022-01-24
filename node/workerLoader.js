const http = require('https')
const { Worker, SHARE_ENV } = require('worker_threads')
const HOST = 'https://widget.motivus.cl'
const CHECK_VERSION_INTERVAL_MS = 180000

const getPublished = (file) =>
  new Promise((resolve, reject) =>
    http
      .get(`${HOST}/${file}`, (res) => {
        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', (chunk) => {
          rawData += chunk
        })
        res.on('end', () => {
          try {
            const parsedData = rawData
            resolve(parsedData)
          } catch (e) {
            console.error(e.message)
          }
        })
      })
      .on('error', (e) => reject(e)),
  )

async function newVersionAvailable(currentVersion) {
  const version = await getPublished('VERSION')
  return currentVersion !== version
}

async function watchVersion(workerHandle, version) {
  if (await newVersionAvailable(version)) {
    clearTimeout(workerHandle.timeoutId)
    workerHandle.terminate()
  } else {
    workerHandle.timeoutId = setTimeout(
      () => watchVersion(workerHandle, version),
      CHECK_VERSION_INTERVAL_MS,
    )
  }
}

async function startWorker() {
  const version = await getPublished('VERSION')
  const worker = await getPublished('worker.js')
  const workerHandle = new Worker(worker, { eval: true, env: SHARE_ENV })
  workerHandle.on('exit', startWorker)

  watchVersion(workerHandle, version)
}

startWorker()
