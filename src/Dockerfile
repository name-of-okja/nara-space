FROM node:alpine 

WORKDIR /app

COPY data ./data
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json

COPY src ./src

RUN npm install -g swagger-cli
RUN npm install

RUN npm run build
RUN npm run swagger:gen

ENV NODE_ENV=docker
