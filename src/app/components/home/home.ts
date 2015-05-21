/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../custom_typings/ng2.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'home'
})
@View({
  // using webpack require our .html and .css file
  template:`
    <style>${require('./home.css')}</style>
    ${require('./home.html')}
  `
})
export class Home {
  constructor() {

  }
}
