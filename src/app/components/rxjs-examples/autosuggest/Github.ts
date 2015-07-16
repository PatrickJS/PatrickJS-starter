/// <reference path="../../../../typings/_custom.d.ts" />

import {bind, Injectable} from 'angular2/di'
import {Http} from 'angular2/http';

import {ISearchable} from 'ISearchable';

@Injectable()
export class Github implements ISearchable<any[]> {
  url: string = 'https://api.github.com/search/repositories?q=';

  constructor(public http: Http) {
  }

  /**
   * @returns an Observable of repository names
   */
  search(query: string): Rx.Observable<any[]> {
    return this.http.get(`${ this.url }${ query }`).
      toRx(). // convert it to pure Rx stream
      map(res => res.json()). // make json
      map(res => res.items). // extract "items" only
      filter(repos => repos); // only if there are results
  }

}


export var githubInjectables = [
  bind(Github).toClass(Github)
];
