/*
 * With ES6 we can convert the arguments Object into an array
 */

function printObjects(...objects) {
  objects.forEach(obj => {
    console.log('ES6 rest object:', obj);
  });
}

printObjects({name: 'PatrickJS'}, {name: 'Lukas'}, {name: 'Jeff'}, {name: 'Dan'});

console.log('-es5-');
 // in ES5 we would do
function printObjectsES5(objects) {
  // re-assign objects as an Array of objects
  objects = Array.prototype.slice.call(arguments);

  objects.forEach(obj => {
     console.log('ES5 rest object:', obj);
   });
}

 printObjectsES5({name: 'PatrickJS'}, {name: 'Lukas'}, {name: 'Jeff'}, {name: 'Dan'});

