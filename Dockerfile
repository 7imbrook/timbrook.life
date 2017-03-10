FROM debian

ADD https://github.com/spf13/hugo/releases/download/v0.19/hugo_0.19_Linux-64bit.tar.gz /tmp
RUN tar -xvf /tmp/hugo_0.19_Linux-64bit.tar.gz -C /usr/bin
ADD https://caddyserver.com/download/build?os=linux&arch=amd64&features=hugo /tmp
RUN tar -xvf /tmp/build -C /usr/bin

WORKDIR /app

COPY ./ /app

ENV SITE_ROOT=0.0.0.0:80
EXPOSE 80
EXPOSE 443

ENTRYPOINT /app/entrypoint.sh
