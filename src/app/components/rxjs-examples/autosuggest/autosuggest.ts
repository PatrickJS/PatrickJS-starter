/// <reference path="../../../../typings/tsd.d.ts" />

// Angular 2
import { Directive, View, ElementRef, NgFor, EventEmitter } from 'angular2/angular2';
import { Inject } from 'angular2/di';

// RxJs
import * as Rx from 'rx';

import { Searchable } from 'Searchable';

@Directive({
  selector: 'input[type=text][autosuggest]',
  events: [ 'term' ]
})
export class Autosuggest {

  service: Searchable<string[]>;
  term: EventEmitter;
  //keyups: Rx.Observable;

  constructor(elementRef: ElementRef, @Inject('Searchable') service: Searchable<string[]>) {

    this.service = service;
    this.term = new EventEmitter();

    Rx.Observable.fromEvent(elementRef.nativeElement, 'keyup')
      .map(e => e.target.value) // Project the text from the input
      .filter((text: string) => text.length > 2) // Only if the text is longer than 2 characters
      .debounce(250) // Pause for 250ms
      .distinctUntilChanged() // Only if the value has changed

      .flatMapLatest((query: string) => this.service.search(query)) // send query to search service

      // here is the real action
      .subscribe(
      (results: string[]) => {
        // fire "term" event
        // the Search component is the listener
        this.term.next(results);
      },
        err => {
        console.log(err);
        this.term.next(["ERROR, see console"]);
      }
    )
  }

}
