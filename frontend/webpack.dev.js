const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

G_CLIENT_ID = "457036339842-blejc39bdlrkfv9gftth6arssmjbnsqq.apps.googleusercontent.com";

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    proxy: {
      '/api/(auth|p)/**': {
        target: 'https://timbrook.tech',
        changeOrigin: true,
      },
      '/api/**': {
        target: 'http://localhost:4000/',
        pathRewrite: {
          '/api': '',
        },
      },
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'CLIENT_ID': JSON.stringify(G_CLIENT_ID)
    }),
  ],
});