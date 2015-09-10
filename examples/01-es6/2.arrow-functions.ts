/*
 * New ES6 Arrow Functions allows us to preserve the context of our callbacks
 *
 */


let object = {
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


let object2 = {
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
