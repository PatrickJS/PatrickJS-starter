
// ES6

// import {ClassObject} from 'framework/or/library';

// ES5

// var lib = require('framework/or/library');
// var ClassObject = lib.ClassObject;


var { x, y } = { x: 11, y: 8 }; // x = 11; y = 8
console.log(x,y);


// This declaration is equivalent to:
var { x: x, y: y } = { x: 11, y: 8 };

console.log(x,y);

// swap variables in ES5
!function() {

  let a = 1;
  let b = 2;

  console.log(a, b); // 1,2

  let temp = b; // hold the value in a temp var
  b = a;
  a = temp

  console.log(a, b); // 2,1

}();

// in ES6 we can use an array as our temp placeholder
!function() {

  let a = 1;
  let b = 2;

  console.log(a, b); // 1,2

  [b, a] = [a, b];

  console.log(a, b); // 2,1

}();

// now it's look at it in ES5
!function() {

  let a = 1;
  let b = 2;

  console.log(a, b); // 1,2


  let temp = [a, b];
  b = temp[0];
  a = temp[1];

  console.log(a, b); // 2,1

}();

