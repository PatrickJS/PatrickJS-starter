/// <reference path="../../../typings/_custom.d.ts" />

import {Component, View} from 'angular2/angular2';

const GREETING_HTML = require('./greeting.html');

@Component({
  selector: 'greeting'
})
@View({
  template: GREETING_HTML
})
export class Greeting {
  constructor() {
  }
}
