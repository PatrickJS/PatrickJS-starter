/// <reference path="../../typings/_custom.d.ts" />

import {Component, View} from 'angular2/angular2';

//import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';


const HEADER_HTML = require('./footer.html');

@Component({
  selector: 'static-footer',
  viewBindings: []
})
@View({
  template: HEADER_HTML
})
export class StaticFooter {
  constructor() {

  }
}
