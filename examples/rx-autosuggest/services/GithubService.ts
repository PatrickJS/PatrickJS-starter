/// <reference path="../../typings/_custom.d.ts" />

import {provide, Injectable} from 'angular2/angular2';
import {Http} from 'angular2/http';
import * as Rx from '@reactivex/rxjs';


@Injectable()
export class GithubService {
  url: string = 'https://api.github.com/search/repositories?q=';
  constructor(public http: Http) {

  }

  /**
   * @returns an Observable of repository names
   */
  search(query: string): Rx.Observable<any[]> {
    return this.http.get(this.url + query)
      .map(res => res.json())  // make json
      .map(res => res.items)   // extract "items" only
      .filter(repos => repos); // only if there are results
  }
}

export var GITHUB_PROVIDERS: Array<any> = [
  provide(GithubService, {useClass: GithubService})
];
