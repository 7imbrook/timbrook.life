const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

G_CLIENT_ID = "457036339842-sl9de0uo0ai90h8sds8s8p82383kb4bp.apps.googleusercontent.com";

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    proxy: {
      '/api/auth': {
        target: 'http://localhost:5000',
        pathRewrite: { '^/api': '' }
      },
      '/api': {
        target: 'https://timbrook.dev/api',
      },
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'CLIENT_ID': JSON.stringify(G_CLIENT_ID)
    }),
  ],
});