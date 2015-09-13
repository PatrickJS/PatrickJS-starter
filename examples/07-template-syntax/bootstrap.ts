// Angular 2
import {bootstrap} from 'angular2/angular2';
import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';


@Component({
  selector: 'app'
})
@View({
  directives: [ CORE_DIRECTIVES ],
  template: `
  <ul>
    <li *ng-for="var item of collection">
     {{ item }}
    </li>
  </ul>
  `
})
class App {
  collection: Array<string>;

  constructor() {

    this.collection = [
      'item-1',
      'item-2',
      'item-3'
    ];

  }
}


bootstrap(App);
