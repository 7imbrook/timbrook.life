FROM openresty/openresty:1.15.8.1rc1-bionic

RUN opm get bungle/lua-resty-template
RUN opm get ledgetech/lua-resty-http

COPY ./preload.html /usr/local/openresty/nginx/html/templates/preload.html

COPY root.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
