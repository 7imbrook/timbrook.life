FROM debian

# Update libs
RUN apt-get update && apt-get upgrade -y

# Install Hugo
ADD https://github.com/spf13/hugo/releases/download/v0.19/hugo_0.19_Linux-64bit.tar.gz /tmp
RUN tar -xvf /tmp/hugo_0.19_Linux-64bit.tar.gz -C /usr/bin
RUN mv /usr/bin/hugo_0.19_linux_amd64/hugo_0.19_linux_amd64 /usr/bin/hugo

# Install caddy
ADD https://caddyserver.com/download/build?os=linux&arch=amd64&features= /tmp
RUN tar -xvf /tmp/build -C /usr/bin

WORKDIR /app
COPY ./ /app
RUN hugo -d ./dist || exit 0

VOLUME /root/.caddy
ENV SITE_ROOT=0.0.0.0:80
EXPOSE 80
EXPOSE 443

ENTRYPOINT /app/entrypoint.sh
