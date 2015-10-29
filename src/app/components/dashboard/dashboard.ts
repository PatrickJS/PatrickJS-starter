/// <reference path="../../../typings/_custom.d.ts" />

import {Component, View} from 'angular2/angular2';

const APP_HTML    = require('./dashboard.html');
const APP_STYLES  = require('!raw!less!./dashboard.less');

// Simple component with custom directive example
@Component({
  selector: 'dashboard'
})
@View({
  styles:     [ APP_STYLES ],
  template: APP_HTML
})
export class Dashboard {
  constructor() {

  }
}
