

// Accessors
class Employee {
  fullName: string;
}

var employee = new Employee();

employee.fullName = 'PatrickJS';

console.log(employee.fullName);


class Animal {
  name: string;

  // Parameter properties
  // type string
  constructor(name: string) {
    this.name = name;
  }

  // Parameter properties
  // type number
  move(miles: number) {
    console.log(this.name + ' moved ' + miles + 'mi');
  }
}


// Static Properties
class Greeter {
  // property types
  standardGreeting: string = 'from @AngularClass';
  greeting: string;

  // argument type
  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    if (this.greeting) {
      return 'Hello, ' + this.greeting;
    } else {
      return Greeter.standardGreeting;
    }
  }

}


var greeter = new Greeter('world');
var greeterStandard = new Greeter();

console.log(greeter.greet());
console.log(greeterStandard.greet());



// Public modifiers
class App {
  // not needed
  // greeter: Greeter

  constructor(public greeter: Greeter) {

    // not needed
    // this.greeter = greeter

  }

  main() {
    this.greeter.greet();
  }
}

var app = new App(greeter);

app.main();
