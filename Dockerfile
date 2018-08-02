FROM node:10-alpine

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm ci || npm install

COPY . ./

CMD npm run setup && npm start
