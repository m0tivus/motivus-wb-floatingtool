import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { v4 as uuidv4 } from 'uuid'

import sagas from 'sagas'
import reducers from 'reducers'
import { setInput } from 'actions'

const clusterMode = process.env.CLUSTER_MODE || 'network'
const loopbackPort = process.env.LOOPBACK_PORT || '7070'

const sagaMiddleware = createSagaMiddleware({
  onError: (e) => {
    console.error(e)
    process.exit()
  },
})
const middlewares = [sagaMiddleware]
middlewares.push(
  createLogger({
    level: {
      prevState: false,
      nextState: false,
      error: 'error',
    },
  }),
)

const store = createStore(reducers, applyMiddleware(...middlewares))

console.log(`Running worker in ${clusterMode} mode`)

sagaMiddleware.run(sagas)

if (clusterMode === 'loopback') {
  var WebSocketServer = require('websocket').server
  var http = require('http')

  var server = http.createServer(function (_request, response) {
    response.writeHead(404)
    response.end()
  })
  server.listen(Number(loopbackPort), function () {
    store.dispatch({ type: 'LOOPBACK_SERVER_STARTED' })
    console.log(`
Running Motivus cluster server in loopback mode on port ${loopbackPort}
Configure driver environment using:
export WEBSOCKET_URI=ws://localhost:${loopbackPort}/client_socket/websocket
      `)
  })

  var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
    maxReceivedFrameSize: 1024 * 1024 * 1024,
  })

  wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin)
    store.dispatch({ type: 'DRIVER_CONNECTED' })
    connection.on('message', function (message) {
      const msg = JSON.parse(message.utf8Data)
      switch (msg.topic) {
        case 'room:client?': {
          switch (msg.event) {
            case 'phx_join': {
              const response = {
                ref: 'uuid',
                payload: {
                  response: { uuid: '71d524bf-fc38-47e9-b9eb-33729402f569' },
                },
              }
              connection.sendUTF(JSON.stringify(response))

              break
            }
            case 'phx_leave': {
              connection.sendUTF(JSON.stringify({ payload: 'ok' }))
              break
            }

            default:
          }

          break
        }

        case 'phoenix': {
          switch (msg.event) {
            case 'heartbeat': {
              break
            }
            default:
          }

          break
        }

        default: {
          switch (msg.event) {
            case 'phx_join': {
              const response = {
                ref: 'join',
                payload: {},
              }
              connection.sendUTF(JSON.stringify(response))

              break
            }
            case 'phx_leave': {
              connection.sendUTF(JSON.stringify({ payload: 'ok' }))
              break
            }

            case 'task': {
              const { payload } = msg
              store.dispatch(
                setInput({ ...payload, tid: uuidv4() }, (result) => {
                  const response = {
                    event: 'result',
                    payload: {
                      ...result,
                      ref: payload.ref,
                    },
                  }
                  connection.sendUTF(JSON.stringify(response))
                }),
              )
              break
            }

            default:
          }
        }
      }
    })
    connection.on('close', function (_reasonCode, _description) {
      store.dispatch({ type: 'DRIVER_DISCONNECTED' })
      store.dispatch({ type: 'STOP_PROCESSING' })
      store.dispatch({ type: 'START_PROCESSING' })
    })
  })
}
