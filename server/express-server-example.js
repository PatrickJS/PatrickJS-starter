// Webpack
var webpack           = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig     = require('../webpack.config');
var express = require('express');

// Express App
var app = express();
var appPort = 8080;

var server = new WebpackDevServer(webpack(webpackConfig), {
  publicPath: '/__build__',
  historyApiFallback: true,
  inline: true,
  quiet: false,
  noInfo: false,
  stats: { colors: true }
});
// Webpack express app that uses socket.io
server.app.use(app);


// Your middleware
app.use(express.static('public'));


server.listen(appPort, function() {
  console.log('Listen on http://localhost:' + appPort);
});
