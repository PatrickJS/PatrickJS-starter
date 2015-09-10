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
require('./1.variable-declarations');

console.log('---------------Arrow Functions---------------');
require('./2.arrow-functions');

console.log('----------------Destructuring----------------');
require('./3.destructuring');

console.log('---------------Template String---------------');
require('./4.template-string');

console.log('----------------Rest Arguments--------------');
require('./5.rest-arguments');

console.log('---------------Spread Arguments--------------');
require('./6.spread-arguments');

console.log('---------------------Class-------------------');
require('./7.class');

console.log('------------Enhanced Object Literals---------');
require('./8.enhanced-object-literals');


// ES6 Modules
// www.2ality.com/2014/09/es6-modules-final.html
