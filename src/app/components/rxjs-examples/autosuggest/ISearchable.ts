/// <reference path="../../../../typings/_custom.d.ts" />

export interface ISearchable<T> {
  search(query: string): Rx.Observable<string[]>;
}
