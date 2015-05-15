import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'dashboard'
})
@View({
  template: '<h1>Hello {{ name }}</h1>'
})
export class Dashboard {
  constructor() {
    this.name = 'Dashboard';
  }
}

