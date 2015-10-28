/// <reference path="../../typings/_custom.d.ts" />
import {Component, View} from 'angular2/angular2';

const FOOTER_HTML = require('./footer.html');

@Component({
  selector: 'static-footer',
  viewBindings: []
})
@View({
  template: FOOTER_HTML
})
export class StaticFooter {
  constructor() {

  }
}
