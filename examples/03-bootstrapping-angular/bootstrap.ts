// Angular 2
import {bootstrap} from 'angular2/angular2';
import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'app'
})
@View({
  template: `
  Hello from Angular
  `
})
class App {
  constructor() {
    console.log('Angular App component');
  }

}


bootstrap(App);
