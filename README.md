# timbrook.life

Personal "life" board, and place for experimentation.

### Running
Building the source
```bash
npm install
npm run build
# or
npm run watch
```

I run a local proxy to have localhost:8080/api go to prod and / go to a node server to handle url rewrites.
```bash
# node server
node server.js

# I use caddy for the proxy (also use it in prod for auto certs from lets encrypt)
caddy -conf Caddyfile.dev
```

That file looks like this
```
localhost:8000 {
  proxy / localhost:8080
  proxy /api {
    upstream https://timbrook.life/api
    without /api
  }
}
```

Enjoy
