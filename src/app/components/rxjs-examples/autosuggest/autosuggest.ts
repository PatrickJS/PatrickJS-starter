/// <reference path="../../../../typings/_custom.d.ts" />

// Angular 2
import {Directive, View, EventEmitter, ElementRef, NgFor} from 'angular2/angular2';

import {Github} from './Github';
// RxJs
import * as Rx from 'rx';


@Directive({
  selector: 'input[type=text][autosuggest]',
  events: [ 'term' ]
})
export class Autosuggest {
  term: EventEmitter;
  //keyups: Rx.Observable;

  constructor(elementRef: ElementRef, public github: Github) {
    this.term = new EventEmitter();

    (<any>Rx).Observable.fromEvent(elementRef.nativeElement, 'keyup').
      map(e => e.target.value). // Project the text from the input
      filter((text: string) => text.length > 2). // Only if the text is longer than 2 characters
      debounce(250). // Pause for 250ms
      distinctUntilChanged(). // Only if the value has changed

      flatMapLatest((query: string) => this.github.search(query)). // send query to search service
      // here is the real action
      subscribe(
        (repos: string[]) => {
          // fire "term" event
          // the Search component is the listener
          this.term.next(repos);
        },
        err => {
          console.log(err);
          this.term.next(['ERROR, see console']);
        }
      )//subscribe
  }

}
