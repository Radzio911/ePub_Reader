FROM node:24.0.2-alpine

WORKDIR /API

COPY package.json /API/

COPY package-lock.json /API/

RUN npm install --include=optional sharp