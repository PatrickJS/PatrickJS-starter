/// <reference path="../../typings/_custom.d.ts" />

/*
 * Angular 2
 */
import {
  Component,
  View,
  CORE_DIRECTIVES,
  FORM_DIRECTIVES
} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

// Use webpack's `require` to get files as a raw string using raw-loader
let styles   = require('./home.css');
let template = require('./home.html');


// Simple external file component example
@Component({
  selector: 'home'
})
@View({
  directives: [
    // Angular's core directives
    CORE_DIRECTIVES,

    // Angular's form directives
    FORM_DIRECTIVES,

    // Angular's router
    ROUTER_DIRECTIVES,
  ],
  // include our .html and .css file
  styles: [ styles ],
  template: template
})
export class Home {
  constructor() {

  }
}
