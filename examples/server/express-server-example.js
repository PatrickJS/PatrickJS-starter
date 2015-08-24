// Webpack
var webpack           = require('webpack');
var WebpackDevServer  = require('webpack-dev-server');
var webpackConfig     = require('../webpack.config');

// Express
var express = require('express');
var history = require('connect-history-api-fallback');
var morgan  = require('morgan');
var bodyParser = require('body-parser');

// Express App
var app = express();

// Env
var PORT     = process.env.PORT || 3000;
var NODE_ENV = process.env.NODE_ENV || 'development';

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Angular Http content type for POST etc defaults to text/plain at
app.use(bodyParser.text(), function ngHttpFix(req, res, next) {
  try {
    req.body = JSON.parse(req.body);
    next();
  } catch(e) {
    next();
  }
});

// Your middleware
app.use(history());
app.use(express.static('src/public'));

// your api middleware
var api = require('./todo_api')();
app.use('/api', api);

// Only use in development
if (NODE_ENV === 'development') {
  var server = new WebpackDevServer(webpack(webpackConfig), {
    publicPath: '/__build__',
    historyApiFallback: false, // won't work due to order
    inline: true,
    quiet: false,
    noInfo: false,
    stats: { colors: true }
  });
  // Webpack express app that uses socket.io
  app.use(server.app);
} else {
  app.use('/__build__', express.static('__build__'));
}


app.listen(PORT, function() {
  console.log('Listen on http://localhost:' + PORT + ' in ' + NODE_ENV);
});
