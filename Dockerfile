FROM node:16

WORKDIR /app

COPY ./src /app/src
COPY package.json /app
COPY yarn.lock /app

RUN yarn install

CMD yarn start

EXPOSE 3000