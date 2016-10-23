FROM node

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install --warn

COPY ./ /app
RUN npm run build

EXPOSE 8080

CMD node server.js
