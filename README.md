# Timbrook.life

Personal "life" board, and place for experimentation.

### Running
Building the source
```bash
npm install
npm run build
# or for webpack dev server
npm start
```

For auth
```bash
npm install
npm start
```

The proxy may need updated to point to the right upstream.

## Deployment
```
docker stack deploy -c docker-compose.yml site
```
