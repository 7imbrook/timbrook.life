const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const S3Uploader = require('webpack-s3-uploader')
const WebpackShellPlugin = require('webpack-shell-plugin');


module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[hash].bundle.js',
    chunkFilename: '[hash].chunk-[id].bundle.js',
    publicPath: 'https://timbrook.sfo2.cdn.digitaloceanspaces.com/' 
  },
  plugins: [
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