FROM node:10-alpine
WORKDIR /opt/shortify

COPY ./ ./
RUN npm ci || npm install

CMD ["/bin/sh", "-c", "npm run setup && npm start"]
