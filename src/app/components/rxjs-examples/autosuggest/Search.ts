/// <reference path="../../../../typings/_custom.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';
import {NgFor} from 'angular2/directives';

import {Autosuggest} from './autosuggest';

@Component({
  selector: 'search-github'
})
@View({
  directives: [ NgFor, Autosuggest ],
  template: `
  <div style="padding: 0 16px;">
    <h2>Search Github repos</h2>

    <div>
      <input
        autosuggest
        (term)="showResults($event)"
        type="text"
        autofocus>
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

  repos: Array<any>;

  constructor() {
    this.repos = [];
  }

  showResults(results: string[]) {
    this.repos = results;
  }

}
