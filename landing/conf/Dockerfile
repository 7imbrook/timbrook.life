FROM openresty/openresty:1.13.6.2-2-centos

RUN opm get bungle/lua-resty-template
RUN opm get ledgetech/lua-resty-http

COPY ./preload.html /usr/local/openresty/nginx/html/templates/preload.html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
