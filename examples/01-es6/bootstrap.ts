
var app = (<any>document.querySelectorAll('app')[0]);
app.innerHTML = 'open up your Console with CMD+Option+I';

/*
 * Intro:
 *
 * In ES6 we have a lot of new features added to JavaScript
 * so let's go over a few of the features that we will see
 * in Angular 2
 *
 */

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

} catch(err) {
  console.error(err);
}

// `let` is also great when dealing with for-loops
for (let i = 0; i < 2; ++i) {
  console.log('I am a loop with let i');
}

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


amazing_people = ['Blake Embrey', 'TJ Holowaychuk']


console.log('-/const-\n');

console.log('---------------------------------------------');
