FROM openresty/openresty:1.13.6.2-2-centos

RUN mkdir -p /etc/apache2/
RUN touch /etc/apache2/.htpasswd

COPY ./static /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80
