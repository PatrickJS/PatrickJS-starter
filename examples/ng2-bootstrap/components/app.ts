/// <reference path="../../typings/_custom.d.ts" />
/// <reference path="../../../node_modules/ng2-bootstrap/ng2-bootstrap.d.ts" />

require('!!style!css!bootstrap/dist/css/bootstrap.css');

import {Component, View} from 'angular2/angular2';
import {RouteConfig} from 'angular2/router';

import {Alert} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app',
})
@View({
  directives: [ Alert ],
  template: `
  <div class="container" style="margin-top: 2em; margin-bottom: 2em;">
    <alert type="info">Hello world from ng2-bootstrap!</alert>
  </div>
  `
})
export class App {
}
