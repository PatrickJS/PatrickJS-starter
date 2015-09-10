
function handler() {
  return 'handler';
}
function get42() {
  return 42;
}

let object = {
  // Shorthand for ‘handler: handler’
  handler,
  // Computed (dynamic) property names
  [ 'prop_' + get42() ]: 42
};

console.log(object.handler())
console.log(object.prop_42());


/*

function middleware(req, res) {
  db.find(req.params.id).then(data => {
    var jsonResponse = {
      ...data,
    };
    jsonResponse[req.params.id] = Number(req.params.id);
    res.json(jsonResponse);

  });
}

app.use('/api', middleware);

function middleware2(req, res) {
  db.find(req.params.id).then(data => {

    res.json({
      ...data,
      [req.params.id] = Number(req.params.id)
    });

  });
}

app.use('/api2', middleware2);

*/
