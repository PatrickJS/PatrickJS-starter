/// <reference path="../../../typings/_custom.d.ts" />

// Angular 2
import {Component, View, NgClass } from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {SearchGithub} from '../../../rx-autosuggest/components/search-github';
import {Timeflies} from '../../../rx-timeflies/components/timeflies';
import {Tictactoe} from '../../../game-tictactoe/components/tictactoe';
//import {DragElement} from '../../../rx-draggable/components/drag-element';


@Component({
  selector: 'rxjs-examples'
})
@RouteConfig([
  { path: '/',              redirectTo: '/search' },
  { path: '/search',        as: 'Search',        component: SearchGithub},
  { path: '/timeflies',     as: 'Timeflies',     component: Timeflies },
  { path: '/tictactoe',     as: 'Tictactoe',     component: Tictactoe },
  //{ path: '/draggable',     as: 'Draggable',     component: DragElement}
])
@View({
  directives: [ ROUTER_DIRECTIVES, NgClass ],
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
             [router-link]=" ['./Search'] "
             (click)="active = 0"
             [class.active]="active === 0">
            Search Github
          </a>
        </li>
        <li>
          <a class="ac-button md-default-theme"
             [router-link]=" ['./Timeflies'] "
             (click)="active = 1"
             [class.active]="active === 1">Timeflies</a>
        </li>
        <li>
          <a class="ac-button md-default-theme"
             [router-link]=" ['./Tictactoe'] "
             (click)="active = 2"
             [class.active]="active === 2">Tic tac toe</a>
        </li>
        <!--<li>-->
          <!--<a class="ac-button md-default-theme"-->
             <!--[router-link]=" ['./Draggable'] "-->
             <!--(click)="active = 3"-->
             <!--[class.active]="active === 3">Drag Element</a>-->
        <!--</li>-->
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
