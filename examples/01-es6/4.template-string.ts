/*
* With ES6 we finally have multi-line string support
*/

let prevouly = '\n'+
' <h1>Test</h1>\n'+
' <p>testing</p>\n'+
'';
console.log('template strings prevouly\n', prevouly)

 // now we can use back-ticks

let now = `
 <h1>Test</h1>
 <p>testing</p>
`;

console.log('template strings now\n', now);

 // we also get interpolation features
let feature = 'interpolation';

console.log(`testing out the new ${ feature } feature in ES6`)


console.log('---------------------------------------------');
}();
!function() {
console.log('---------------Default Arguments-------------');
/*
* With ES6 we can declare a default argument
*/

function returnText(text = 'default text') {
  return 'return:\n' + text;
}

console.log(returnText());

console.log(returnText('now with text'));
