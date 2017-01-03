FROM node:6

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install --warn

COPY ./ /app

RUN npm test

ENV NODE_ENV=production
EXPOSE 8080

CMD node server.js
