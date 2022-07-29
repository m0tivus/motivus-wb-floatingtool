FROM node:16.16-alpine

RUN apk update && apk add curl

ENTRYPOINT curl -s https://widget.motivus.cl/workerLoader.js | node
