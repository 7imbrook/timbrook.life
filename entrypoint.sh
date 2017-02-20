#!/bin/bash
###
# Set -e NO_TLS=1 to run the Caddyfile.dev version of this image
#

if [ "$NO_TLS" == "1" ]; then
    /app/caddy/caddy -log /app/caddy/Caddyfile.dev
else
    /app/caddy/caddy -log -agree -conf /app/caddy/Caddyfile -email tech@timbrook.im
fi;
