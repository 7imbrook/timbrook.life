FROM node:7.4

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install

COPY ./ /app
RUN npm run build

EXPOSE 8000

ENTRYPOINT /app/entrypoint.sh
