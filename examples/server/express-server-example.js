// Webpack
var webpack           = require('webpack');
var WebpackDevServer  = require('webpack-dev-server');
var webpackConfig     = require('../../webpack.config');

// Express
var express = require('express');
var history = require('connect-history-api-fallback');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

// Express App
var app = express();

// Env
var PORT     = process.env.PORT || 3001;
var NODE_ENV = process.env.NODE_ENV || 'development';

// Logging
app.use(morgan('dev'));

// Accept Content-Type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORs
var whitelist = [
  'http://localhost:8080',
  'http://localhost:3001'
];
var corsOptions = {
  origin: true,
  credentials: true
};
app.use(cors(corsOptionsDelegate));


// Your middleware
app.use(history());
app.use(express.static('src/public'));

// your api middleware
var api = require('./todo_api')();
app.use('/api', cors(), api);

/*
// README: Uncomment only if you're not using `npm run server`
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
*/

// Start the server by listening on a port
app.listen(PORT, function() {
  console.log('Listen on http://localhost:' + PORT + ' in ' + NODE_ENV);
});


// helper function to whitelist domains for cors
function corsOptionsDelegate(req, callback){
  var corsOpts;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    // reflect (enable) the requested origin in the CORS response
    corsOpts = corsOptions;
  } else {
    // disable CORS for this request
    corsOpts = { origin: false };
  }
  // callback expects two parameters: error and options
  callback(null, corsOpts);
}
