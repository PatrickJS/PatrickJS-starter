/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../custom_typings/ng2.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';

// Use webpack to get files as a raw string using raw-loader
let styles   = require('./home.css');
let template = require('./home.html');

@Component({
  selector: 'home'
})
@View({
  // include our .html and .css file
  template:`<style>${styles}</style>\n${template}`
})
export class Home {
  constructor() {

  }
}
