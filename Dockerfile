FROM node

RUN apt-get update && apt-get install -y nginx
RUN rm /etc/nginx/sites-enabled/*
COPY ./nginx/ /etc/nginx/sites-enabled/

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install --warn

COPY ./ /app
RUN npm run build

RUN chmod 755 -R /app/dist
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
