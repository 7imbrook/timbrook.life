const merge = require('webpack-merge');
const common = require('./webpack.common.js');

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
});