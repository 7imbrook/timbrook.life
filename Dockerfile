FROM node

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install --warn

COPY ./ /app
RUN npm run build

EXPOSE 8000

CMD ./caddy/caddy -conf ./caddy/Caddyfile -email tech@timbrook.im
