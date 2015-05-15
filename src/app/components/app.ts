/// <reference path="../../../typings/angular2/angular2.d.ts" />

import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'app'
})
@View({
  template: '<h1>Hello {{ name }}</h1>'
})
export class App {
  constructor() {
    this.name = 'Angular 2';
  }
}
