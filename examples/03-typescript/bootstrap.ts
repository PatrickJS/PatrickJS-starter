

// Member types
class Greeter {
  // property types
  greeting: string;

  // argument type
  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return 'Hello, ' + this.greeting;
  }

}


var greeter = new Greeter('world');

greeter.greet();



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
