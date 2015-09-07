!function(doc) {
  var app = (<any>doc.querySelectorAll('app')[0]);
  app.innerHTML = 'open up your Console with CMD+Option+I';
}(document);

/*
 * Intro:
 *
 * In ES6 we have a lot of new features added to JavaScript
 * so let's go over a few of the features that we will see
 * in Angular 2
 * please consider using https://babeljs.io/repl
 */

!function() {
  console.log('----------ES6 variable declarations----------');


  /*
   * New ES6 variable declarations with `let` and `const`
   *
   */


  console.log('-let-');
  try {

    // `let` vs `var`
    // While `var` creates a variable scoped within its nearest parent function,
    // let scopes the variable to the nearest block
    function variableDeclarationsLetVar() {
      console.log('before: foo:', foo); // => undefined

      var foo = 'IamVar';
      if (foo === 'IamVar') {
        let foo = 'IamLet';
      }

      console.log('after: foo:', foo); // => 'IamVar'

    }

    variableDeclarationsLetVar();
    console.log('after: variableDeclarationsLetVar():', foo);

  } catch(err) { console.error(err); }

  // `let` is also great when dealing with for-loops
  for (let i = 0; i < 2; ++i) {
    console.log('I am a loop with let i');
  }

  // notice the same `let` variable is used in the same scope
  for (let i = 0; i < 2; ++i) {
    console.log('I am another loop with let i');
  }

  console.log('-/let-\n');
  console.log('-const-');

  const amazing_people = ['PatrickJS', 'Lukas', 'Jeff', 'Dan'];

  console.log(amazing_people);

  amazing_people.push('Douglas Crockford');
  amazing_people.push('Brendan Eich');

  console.log(amazing_people);

  amazing_people = ['Blake Embrey', 'TJ Holowaychuk']; // shouldn't happen

  console.log('ref change', amazing_people); // warning happens

  console.log('-/const-\n');

  console.log('---------------------------------------------');
}();
!function() {
  console.log('---------------Arrow Functions---------------');
  /*
   * New ES6 Arrow Functions allows us to preserve the context of our callbacks
   *
   */


  var object = {
    collection: ['PatrickJS', 'Lukas', 'Jeff', 'Dan'],
    value: 'print some value:',
    method: function() {
      console.log(this.value, 'method');
      this.collection.forEach(function(item) {
        console.log(this.value, item);
      });
    }
  };

  // notice how this.value inside of the forEach callback is `undefined`
  object.method();


  var object2 = {
    collection: ['PatrickJS', 'Lukas', 'Jeff', 'Dan'],
    value: 'print some value:',
    method: function() {
      console.log(this.value, 'method');
      this.collection.forEach((item) => {
        console.log(this.value, item);
      });
    }
  };

  // we fixed this by preserving the context for the callback
  object2.method();

  /*
   * what's happening is the context of when the function was created is preserved in the function

  var object2 = {
    collection: ['PatrickJS', 'Lukas', 'Jeff', 'Dan'],
    value: 'print some value:',
    method: function() {
      var _self = this;
      console.log(this.value, 'method');
      this.collection.forEach(function(item) {
        console.log(_self.value, item);
      });
    }
  };

   * here's another way to write this in ES5

  var object2 = {
    collection: ['PatrickJS', 'Lukas', 'Jeff', 'Dan'],
    value: 'print some value:',
    method: function() {
      console.log(this.value, 'method');
      this.collection.forEach(function(item) {
        console.log(this.value, item);
      }.bind(this));
    }
  };
   */


  function callingBack(callback) {
    callback();
  }

  console.log('arrow callback pattern');
  try {

    callingBack(object2.method); // this doesn't work and throws an error

  } catch(e) { console.error(e); }

  // very common pattern in order to preserve the context
  callingBack(() => object2.method());

  console.log('---------------------------------------------');
}();
!function() {
  console.log('----------------Destructuring----------------');

  // ES6

  // import {ClassObject} from 'framework/or/library';

  // ES5

  // var lib = require('framework/or/library');
  // var ClassObject = lib.ClassObject;

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


  console.log('---------------------------------------------');
}();
!function() {
  console.log('---------------Template String---------------');
/*
 * With ES6 we finally have multi-line string support
 */

   var prevouly = '\n'+
'   <h1>Test</h1>\n'+
'   <p>testing</p>\n'+
'   ';
   console.log('template strings prevouly\n', prevouly)

   // now we can use back-ticks

   var now = `
   <h1>Test</h1>
   <p>testing</p>
   `;

   console.log('template strings now\n', now);


  console.log('---------------------------------------------');
}();
