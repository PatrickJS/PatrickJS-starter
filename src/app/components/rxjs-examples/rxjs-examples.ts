/// <reference path="../../../typings/_custom.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';
import {NgIf, CSSClass} from 'angular2/directives';

import {Search} from './autosuggest/Search';
import {Timeflies} from './timeflies/timeflies';

// Use webpack's `require` to get files as a raw string using raw-loader
let styles   = require('./rxjs.css');


@Component({
  selector: 'rxjs-examples'
})
@View({
  directives: [ NgIf, CSSClass, Search, Timeflies ],

  // include our .css file
  styles: [ styles ],

  template: `
  <div layout="row">
    <nav class="side-nav l-pinned-left l-layer-4 l-offset-nav">
      <ul class="rxjs-menu">
        <li>
          <a (click)="selectComponent('search')"    [class]="getActiveClass('search')" class="ac-button ac-default-theme">Search Github</a>
        </li>
        <li>
          <a (click)="selectComponent('timeflies')" [class]="getActiveClass('timeflies')" class="ac-button md-default-theme">Timeflies</a>
        </li>
      </ul>
    </nav>

    <div layout="column" class="wide">
      <div class="rxjs-content" *ng-if="isActive('search')">
        <search-github></search-github>
      </div>

      <div class="rxjs-content" *ng-if="isActive('timeflies')">
        <timeflies></timeflies>
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
}
