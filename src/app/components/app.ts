/// <reference path="../../typings/_custom.d.ts" />

/*
 * Angular 2
 */
import {Component, View} from 'angular2/angular2';
import {RouteConfig} from 'angular2/router';

/*
 * Directives
 */
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';
// Import all of our custom app directives
import {APP_DIRECTIVES} from '../directives/directives';

/*
 * App Pipes
 * our collection of pipes registry
 */
import {APP_PIPES} from '../pipes/pipes';

/*
 * Components
 */
import {Greeting} from './greeting/greeting';
import {Dashboard} from './dashboard/dashboard';

const APP_STYLES = require('!raw!less!./app.less');
const APP_HTML = require('./app.html');

@Component({
  selector: 'app',
  viewBindings: []
})
@View({
  pipes:      [ APP_PIPES ],
  directives: [ APP_DIRECTIVES, Greeting ],
  styles:     [ APP_STYLES ],
  template:   APP_HTML
})
@RouteConfig([
  { path: '/',         as: 'Dashboard',     component: Dashboard },
  //{ path: '/todo',              as: 'Todo',          component: Todo },
  //{ path: '/rxjs-examples/...', as: 'RxjsExamples', component: RxJsExamples }
])
export class App {
  constructor() {
  }
}
