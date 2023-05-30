FROM node:16.16-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock webpack.config.js craco.config.js jsconfig.json ./
ADD src ./src
ADD node ./node
RUN yarn
RUN yarn build-standalone-worker
ENTRYPOINT node --no-deprecation dist/worker.js
