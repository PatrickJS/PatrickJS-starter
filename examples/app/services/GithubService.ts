/// <reference path="../../../../typings/_custom.d.ts" />

import {bind, Injectable, Inject, Http} from 'angular2/angular2';
import * as Rx from 'rx';

export interface ISearchable<T> {
  search(query: string): Rx.Observable<string[]>;
}

export const githubUrl = 'https://api.github.com/search/repositories?q=';

@Injectable()
class GithubUrl {
  url: string = githubUrl;

  search(query: string): string {
    return `${ this.url }${ query }`;
  }
}



@Injectable()
export class GithubService implements ISearchable<any[]> {
  constructor(public http: Http, public githubUrl: GithubUrl) {

  }

  /**
   * @returns an Observable of repository names
   */
  search(query: string): Rx.Observable<any[]> {
    let url = this.githubUrl.search(query);
    return this.http.get(url).
      toRx(). // convert it to pure Rx stream
      map(res => res.json()). // make json
      map(res => res.items). // extract "items" only
      filter(repos => repos); // only if there are results
  }

}

export const GITHUB_BINDINGS = [
  GithubUrl,
  GithubService
];
