// Node
var util = require('util');

// Express
var express = require('express');

// your API
var count = 0;
var todos = [
  { value: 'finish example', created_at: new Date() },
  { value: 'add tests',      created_at: new Date() },
  { value: 'include development environment', created_at: new Date() },
  { value: 'include production environment',  created_at: new Date() }
];

module.exports = function() {
  var router = express.Router();


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

  return router;
};
