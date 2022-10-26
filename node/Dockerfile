FROM node:16.16-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
ADD src ./src
ADD node ./node
ENTRYPOINT yarn worker
