/// <reference path="../../../../typings/tsd.d.ts" />

import { Inject } from 'angular2/angular2'
import { Http }   from 'angular2/http';
import { Searchable } from 'Searchable';

export class Github implements Searchable<string[]> {

  url:string = 'https://api.github.com/search/repositories?q=';
  http: Http;

  constructor(@Inject(Http) http: Http) {
    this.http = http;
  }

  /**
   * @returns an Observable of repository names
   */
  search(query: string): Rx.Observable<string[]> {
    return this.http.get(`${this.url}${query}`)
      .toRx() // convert it to pure Rx stream
      .map(x => x.json()) // make json
      .map(response => response.items) // extract "items" only
      .map(repos => repos.map(repo => repo.name)); // just give me the repo name
  }

}
