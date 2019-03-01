const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    before: function(app, server) {
      app.post('/api/auth/generate_session', function(req, res) {
        res.setHeader("Set-Cookie", "sessionid=test;Max-Age=3600;Path=/")
        res.json({ session_expire: 3600 });
      });
    },
    proxy: {
      '/api': 'http://nginx/',
    }
  },
});