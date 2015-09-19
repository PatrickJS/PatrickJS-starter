// Angular 2
import {bootstrap} from 'angular2/angular2';
import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'ac-word'
})
@View({
  template: `
  <span>
    Hello from Angular Class
  </span>
  `
})
class AcWord {
  constructor() {
    console.log('Angular Class Word component');
  }

}

@Component({
  selector: 'ac-box'
})
@View({
  directives: [
    AcWord
  ],
  template: `
  <div>
    <ac-word></ac-word>
  </div>
  `
})
class AcBox {
  constructor() {
    console.log('Angular Class Box component');
  }

}

@Component({
  selector: 'app'
})
@View({
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    AcBox
  ],
  template: `
  <header>
    AngularClass
  </header>

  <main>
    <ac-box></ac-box>
  </main>

  <footer>
    © AngularClass 2015
  </footer>

  `
})
class App {
  constructor() {
    console.log('Angular App component');
  }
}


bootstrap(App, []);
