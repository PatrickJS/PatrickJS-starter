// Angular 2
import {bootstrap} from 'angular2/angular2';
import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'ac-word'
})
@View({
  template: `
  Hello from Angular Class
  `
})
class App {
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
  <ac-word></ac-word>
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
  directives: [
    AcBox
  ],
  template: `
  <ac-box></ac-box>
  `
})
class App {
  constructor() {
    console.log('Angular App component');
  }
}


bootstrap(App);
