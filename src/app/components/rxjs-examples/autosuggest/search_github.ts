/// <reference path="../../../../typings/tsd.d.ts" />

// Angular 2
import { Component, View, NgFor } from 'angular2/angular2';

import { Autosuggest } from './autosuggest';

@Component({
  selector: 'search-github'
})
@View({
  directives: [ NgFor, Autosuggest ],
  template: `
    <div style="padding: 0 16px;">
      <h2>Search Github repos</h2>

      <div><input autosuggest (term)="showResults($event)" type="text" /></div>

      <div>
        <div *ng-for="#item of items">
          {{ item }}
        </div>
      </div>
    </div>
  `
})
export class Search {

  items: Array<string>;

  constructor() {
    this.items = [];
  }

  showResults(results: string[]) {
    this.items = results;
  }

}
