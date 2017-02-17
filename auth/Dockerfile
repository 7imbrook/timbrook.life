FROM node:6

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install --warn

COPY ./ /app

ENV JWT_SECRET='testing secret'
RUN npm test

ENV NODE_ENV=production
EXPOSE 8080

COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT /entrypoint.sh
