// Node
var util = require('util');

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
var router = express.Router();

// Env
var PORT     = process.env.PORT || 8080;
var NODE_ENV = process.env.NODE_ENV || 'development';


// your API
var count = 0;
var todos = [
  { value: 'finish example', created_at: new Date() },
  { value: 'add tests',      created_at: new Date() },
  { value: 'include development environment', created_at: new Date() },
  { value: 'include production environment',  created_at: new Date() }
];
router.route('/todos')
  .get(function(req, res) {
    console.log('GET');
    res.json(todos);
  })
  .post(function(req, res) {
    console.log('POST', util.inspect(req.body, {colors: true}));
    var todo = req.body;
    if (todo) {
      todos.push(todo);
      res.json(todo);
    } else {
      res.end();
    }
  })

router.param('todo_id', function(req, res, next, todo_id) {
  var id = Number(req.params.todo_id);
  try {
    var todo = todos[id];
    req.todo = todos[id];
    next();
  } catch(e) {
    next(new Error('failed to load todo'));
  }
});

router.route('/todos/:todo_id')
  .get(function(req, res) {
    console.log('GET');
    res.json(req.todo);
  })
  .put(function(req, res) {
    console.log('PUT', util.inspect(req.body, {colors: true}));
    var index = todos.indexOf(req.todo);
    var todo = todos[index] = req.body;
    res.json(todo);
  })
  .delete(function(req, res) {
    console.log('DELETE');
    var index = todos.indexOf(req.todo);
    todos.splice(index, 1);
    res.json(req.todo);
  });

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
app.use(express.static('public'));

// your api middleware
app.use('/api', router);

// Only use in development
if (process.env.NODE_ENV === 'development') {
  var server = new WebpackDevServer(webpack(webpackConfig), {
    publicPath: '/__build__',
    historyApiFallback: false, // won't work due to order
    inline: true,
    quiet: false,
    noInfo: false,
    stats: { colors: true }
  });
  app.use(server.app);
}
// Webpack express app that uses socket.io


app.listen(PORT, function() {
  console.log('Listen on http://localhost:' + PORT + ' in ' + NODE_ENV);
});
