/**
 * @author: @AngularClass
 */

var helpers = require('./helpers');
var config = require('./webpack.common.js');

// Switch loaders to debug mode.
//
// See: http://webpack.github.io/docs/configuration.html#debug
config.debug = true;

// Developer tool to enhance debugging
//
// See: http://webpack.github.io/docs/configuration.html#devtool
// See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
config.devtool = 'cheap-module-eval-source-map';

// Options affecting the output of the compilation.
//
// See: http://webpack.github.io/docs/configuration.html#output
config.output = {

  // The output directory as absolute path (required).
  //
  // See: http://webpack.github.io/docs/configuration.html#output-path
  path: helpers.root('dist'),

  // Specifies the name of each output file on disk.
  // IMPORTANT: You must not specify an absolute path here!
  //
  // See: http://webpack.github.io/docs/configuration.html#output-filename
  filename: '[name].bundle.js',

  // The filename of the SourceMaps for the JavaScript files.
  // They are inside the output.path directory.
  //
  // See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
  sourceMapFilename: '[name].map',

  // The filename of non-entry chunks as relative path
  // inside the output.path directory.
  //
  // See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
  chunkFilename: '[id].chunk.js'

};

// Static analysis linter for TypeScript advanced options configuration
// Description: An extensible linter for the TypeScript language.
//
// See: https://github.com/wbuchwalter/tslint-loader
config.tslint = {
  emitErrors: false,
  failOnHint: false,
  resourcePath: 'src'
};

// Webpack Development Server configuration
// Description: The webpack-dev-server is a little node.js Express server.
// The server emits information about the compilation state to the client,
// which reacts to those events.
//
// See: https://webpack.github.io/docs/webpack-dev-server.html
config.devServer = {
  port: config.metadata.port,
  host: config.metadata.host,
  historyApiFallback: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
};

config.node.process = true;

module.exports = config;
