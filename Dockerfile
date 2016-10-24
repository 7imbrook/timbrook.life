FROM node

RUN npm install -g yarnpkg

WORKDIR /app
COPY ./package.json /app/package.json
RUN yarn

COPY ./ /app
RUN npm run build

EXPOSE 8080

CMD node server.js
