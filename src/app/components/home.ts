import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'home'
})
@View({
  template: '<h1>Hello {{ name }}</h1>'
})
export class Home {
  constructor() {
    this.name = 'Home';
  }
}

