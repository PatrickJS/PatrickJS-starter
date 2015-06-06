/// <reference path="../../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';

// Directives
import {coreDirectives} from 'angular2/directives';
import {formDirectives} from 'angular2/forms';
import {appDirectives} from 'app/directives/directives';


// Use webpack to get files as a raw string using raw-loader
let styles   = require('./home.css');
let template = require('./home.html');

@Component({
  selector: 'home'
})
@View({
  directives: [ coreDirectives, formDirectives, appDirectives ],
  // include our .html and .css file
  template:`<style>${styles}</style>\n${template}`
})
export class Home {
  constructor() {

  }
}
