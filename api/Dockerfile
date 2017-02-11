FROM debian:jessie

ENV POSTGREST_VERSION 0.4.0.0

RUN apt-get update && \
    apt-get install -y tar xz-utils wget libpq-dev m4 && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN wget http://github.com/begriffs/postgrest/releases/download/v${POSTGREST_VERSION}/postgrest-${POSTGREST_VERSION}-ubuntu.tar.xz && \
    tar --xz -xvf postgrest-${POSTGREST_VERSION}-ubuntu.tar.xz && \
    mv postgrest /usr/local/bin/postgrest && \
    rm postgrest-${POSTGREST_VERSION}-ubuntu.tar.xz

COPY ./postgrest.m4 /tmp/postgrest.m4
COPY ./entrypoint.sh /entrypoint.sh

EXPOSE 3000

ENTRYPOINT /entrypoint.sh
