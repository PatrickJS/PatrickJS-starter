
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
