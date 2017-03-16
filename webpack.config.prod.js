const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: './react/index.jsx',
    vendor: [
      'react',
      'react-dom',
    ],
  },
  output: {
    path: path.join(__dirname, 'static', 'js'),
    filename: '[name].[chunkhash].js',
    publicPath: '/js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('react'),
      'node_modules',
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      filename: '../../layouts/partials/header.html',
      template: 'react/header.ejs',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};
