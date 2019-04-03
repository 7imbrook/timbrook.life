const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const S3Uploader = require('webpack-s3-uploader')
const WebpackShellPlugin = require('webpack-shell-plugin');
const webpack = require('webpack');

G_CLIENT_ID = "457036339842-blejc39bdlrkfv9gftth6arssmjbnsqq.apps.googleusercontent.com";

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[hash].bundle.js',
    chunkFilename: '[hash].chunk-[id].bundle.js',
    publicPath: 'https://timbrook.sfo2.cdn.digitaloceanspaces.com/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'CLIENT_ID': JSON.stringify(G_CLIENT_ID)
    }),
    new S3Uploader({
      exclude: ['index.html'],
      s3Options: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        endpoint: 'sfo2.digitaloceanspaces.com'
      },
      s3UploadOptions: {
        Bucket: 'timbrook'
      },
    }),
    new WebpackShellPlugin({
      onBuildEnd: [
        'pwd',
        'cp ./dist/index.html ./conf/preload.html',
      ]
    }),
  ]
});