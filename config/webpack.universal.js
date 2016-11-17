var webpack = require('webpack');
var path = require('path');
var clone = require('js.clone');
var webpackMerge = require('webpack-merge');

var clientConfig = require('./webpack.client.js');
var serverConfig = require('./webpack.server.js');



module.exports = [
  // Client
  clientConfig(),

  // Server
  serverConfig()
];

