// Webpack
var webpack           = require('webpack');
var WebpackDevServer  = require('webpack-dev-server');
var webpackConfig     = require('../webpack.config');
var express = require('express');
var history = require('connect-history-api-fallback');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// Express App
var app = express();
var router = express.Router();
var PORT = process.env.PORT || 8080;
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
    console.log('POST', req.body);
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
    console.log('PUT', req.body);
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

// your api middleware
app.use('/api', router);

// Your middleware
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(morgan('dev'));

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
