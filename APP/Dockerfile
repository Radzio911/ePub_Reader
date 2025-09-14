FROM node:22.12-bullseye 

WORKDIR /app
COPY package.json ./
RUN npm install

RUN npm update

COPY . .


