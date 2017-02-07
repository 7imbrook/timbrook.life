'use strict';

const webpack = require('webpack');
const config = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');

const server = new WebpackDevServer(webpack(config), {
  contentBase: './src',
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
  proxy: {
      "/api/**": {
          target: "http://postgrest-1.postgrest.3dca612f.cont.dockerapp.io:9001/",
          changeOrigin: true,
          pathRewrite: {
              "^/api": ""
          }
      }
  }
});

server.listen(process.env.PORT || 8000, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + (process.env.PORT || 8000));
});
