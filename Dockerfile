FROM node:10-alpine

WORKDIR database

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "node", "app.js" ]