/*
 * We now have sugar for a common pattern a lot of people use in ES5
 * we commented out the code because class declarations needs to be
 * declared at the top-level declaration
 */



// ES6 class
class TestObject {

}

console.log('\n', TestObject.toString())

// ES5 we would do this
function TestObjectES5() {

}

console.log('\n', TestObjectES5.toString())




// what happens when we add a method?

// ES6 class
class TestObject {
  method() {
    console.log('method');
  }
}

console.log('\n', TestObject.prototype.method.toString())

// ES5 we would do this
function TestObjectES5() {

}

TestObjectES5.prototype.method = function() {
  console.log('method');
}

console.log('\n', TestObjectES5.prototype.method.toString())



// what happens when we subclass?

class AnotherObject {

}
// ES6 class
class TestObject extends AnotherObject {
  method() {
    console.log('method');
  }
}

function AnotherObjectES5() {

}

// ES5 we would do this
function TestObjectES5() {
  AnotherObjectES5.apply(this, arguments);

}

TestObjectES5.prototype = Object.create(AnotherObjectES5);
TestObjectES5.prototype.constructor = TestObjectES5;

TestObjectES5.prototype.method = function() {
  console.log('method');
}


