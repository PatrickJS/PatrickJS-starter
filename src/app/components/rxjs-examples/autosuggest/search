/// <reference path="../../../../typings/_custom.d.ts" />

// Angular 2
import {Component, View, coreDirectives, formDirectives} from 'angular2/angular2';

import {Autosuggest} from './autosuggest';

@Component({
  selector: 'search-github'
})
@View({
  directives: [ coreDirectives, formDirectives, Autosuggest ],
  template: `
  <div style="padding: 0 16px;">
    <h2>Search Github repos</h2>

    <div>
      <input
        autosuggest
        (term)="showResults($event)"
        (loading)="loading = $event"
        type="text"
        autofocus>
      <img
        style="width: 20px;position: absolute;"
        [hidden]="!loading"
        src="https://www.brown.edu/sites/default/themes/pawtuxet/img/loader-larger.gif">
    </div>

    <div>
      <div *ng-for="#repo of repos">
        <a [href]="repo.html_url" target="_blank">
          {{ repo.name }}
        </a>
      </div>
    </div>
  </div>
  `
})
export class Search {
  repos: Array<any> = [];
  loading: boolean = false;

  constructor() {
  }

  showResults(results: string[]) {
    this.repos = results;
  }

}
