/// <reference path="../../../typings/_custom.d.ts" />

// Angular 2
import {Component, View, CSSClass} from 'angular2/angular2';
import {RouteConfig, routerDirectives} from 'angular2/router';

import {Search} from './autosuggest/search';
import {Timeflies} from './timeflies/timeflies';
import {Tictactoe} from './tictactoe/tictactoe';
import {DraggableDiv} from './draggable_div/draggable_div';


@Component({
  selector: 'rxjs-examples'
})
@RouteConfig([
  { path: '/',              redirectTo: '/search' },
  { path: '/search',        as: 'search',        component: Search },
  { path: '/timeflies',     as: 'timeflies',     component: Timeflies },
  { path: '/tictactoe',     as: 'tictactoe',     component: Tictactoe },
  { path: '/draggable_div', as: 'draggable_div', component: DraggableDiv }
])
@View({
  directives: [ routerDirectives, CSSClass ],
  // include our .css file
  styles: [
    // Use webpack's `require` to get files as a raw string using raw-loader
    require('./rxjs.css')
  ],
  template: `
  <div layout="row">
    <nav class="side-nav l-pinned-left l-layer-4 l-offset-nav">
      <ul class="rxjs-menu">
        <li>
          <a class="ac-button ac-default-theme"
             [router-link]=" ['./search'] "
             (click)="active = 0"
             [class.active]="active === 0">
            Search Github
          </a>
        </li>
        <li>
          <a class="ac-button md-default-theme"
             [router-link]=" ['./timeflies'] "
             (click)="active = 1"
             [class.active]="active === 1">Timeflies</a>
        </li>
        <li>
          <a class="ac-button md-default-theme"
             [router-link]=" ['./tictactoe'] "
             (click)="active = 2"
             [class.active]="active === 2">Tic tac toe</a>
        </li>
        <li>
          <a class="ac-button md-default-theme"
             [router-link]=" ['./draggable_div'] "
             (click)="active = 3"
             [class.active]="active === 3">Drag Element</a>
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
  active: number = 0;
}
