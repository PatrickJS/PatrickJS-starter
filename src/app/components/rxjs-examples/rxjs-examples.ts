/// <reference path="../../../typings/_custom.d.ts" />

// Angular 2
import {Component, View, CSSClass} from 'angular2/angular2';
import {RouteConfig, routerDirectives} from 'angular2/router';

import {Search} from './autosuggest/Search';
import {Timeflies} from './timeflies/timeflies';
import {Tictactoe} from './tictactoe/tictactoe';

// Use webpack's `require` to get files as a raw string using raw-loader
let styles   = require('./rxjs.css');


@Component({
  selector: 'rxjs-examples'
})
@RouteConfig([
  { path: '/',           redirectTo: '/search' },
  { path: '/search',     as: 'search',    component: Search },
  { path: '/timeflies',  as: 'timeflies', component: Timeflies },
  { path: '/tictactoe',  as: 'tictactoe', component: Tictactoe }
])
@View({
  directives: [ routerDirectives, CSSClass ],

  // include our .css file
  styles: [ styles ],

  template: `
  <div layout="row">
    <nav class="side-nav l-pinned-left l-layer-4 l-offset-nav">
      <ul class="rxjs-menu">
        <li>
          <a [router-link]="['./search']" class="ac-button ac-default-theme">Search Github</a>
        </li>
        <li>
          <a [router-link]="['./timeflies']" class="ac-button md-default-theme">Timeflies</a>
        </li>
        <li>
          <a [router-link]="['./tictactoe']" class="ac-button md-default-theme">Tic tac toe</a>
        </li>
      </ul>
    </nav>

    <div layout="column" class="wide">
      <div class="rxjs-content">
        <router-outlet></router-outlet>
      </div>
    </div>

  </div>
  `
})
export class RxJsExamples {

  private currentComponent: string = 'search';

  selectComponent(component) {
    this.currentComponent = component;
  }

  isActive(component) {
    return component === this.currentComponent;
  }

  getActiveClass(component){
    if (this.isActive(component)) {
      return 'active';
    }
  }

  /**
   * Next two methods are not working yet
   */
  canActivate() {
    console.info('canActivate works with the new router')
  }

  activate() {
    console.info('activate works with the new router')
  }
}
