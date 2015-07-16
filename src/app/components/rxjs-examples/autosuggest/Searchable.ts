/// <reference path="../../../../typings/tsd.d.ts" />

export interface Searchable<T> {
  search(query: string): Rx.Observable<T[]>;
}
