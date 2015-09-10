var app = (<any>doc.querySelectorAll('app')[0]);
app.innerHTML = 'open up your Console with CMD+Option+I';

/*
 * Intro:
 *
 * In ES6 we have a lot of new features added to JavaScript
 * so let's go over a few of the features that we will see
 * in Angular 2
 * please consider using https://babeljs.io/repl
 */

console.log('----------ES6 variable declarations----------');
require('./variable-declarations');

console.log('---------------Arrow Functions---------------');
require('./arrow-functions');

console.log('----------------Destructuring----------------');
require('./destructuring');

console.log('---------------Template String---------------');
require('./template-string');

console.log('----------------Rest Arguments--------------');
require('./rest-arguments');

console.log('---------------Spread Arguments--------------');
require('./spread-arguments');

console.log('---------------------Class-------------------');
require('./class');

console.log('------------Enhanced Object Literals---------');
require('./enhanced-object-literals');
