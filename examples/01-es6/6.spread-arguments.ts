/*
 * With ES6 spread out an array into arguments for a function
 */

function f(x, y, z) {
  return x + y + z;
}
// Pass each elem of array as argument
f(...[1, 2, 3]) === 6

function printObjects(...objects) {
   console.log('rest object:', ...objects);
}

printObjects({name: 'PatrickJS'}, {name: 'Lukas'}, {name: 'Jeff'}, {name: 'Dan'});

