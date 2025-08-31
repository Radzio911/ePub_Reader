FROM node:24-alpine

WORKDIR /api

COPY package*.json ./
RUN npm install --cpu=x64 --os=linux --libc=musl sharp
RUN npm install 

COPY . .

EXPOSE 5555