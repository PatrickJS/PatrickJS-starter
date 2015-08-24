/// <reference path="../../../../typings/_custom.d.ts" />

// Angular 2
import {Directive, View, EventEmitter, ElementRef, LifecycleEvent} from 'angular2/angular2';

// RxJs
import * as Rx from 'rx';


@Directive({
  selector: 'input[type=text][autosuggest]',
  lifecycle: [ LifecycleEvent.onInit ],
  events: [ 'term', 'loading' ]
})
export class Autosuggest {
  term:    EventEmitter = new EventEmitter();
  loading: EventEmitter = new EventEmitter();

  constructor(private el: ElementRef, public github: Github) {

  }
  onInit() {

    (<any>Rx).Observable.fromEvent(this.el.nativeElement, 'keyup').
      map(e => e.target.value).                  // Project the text from the input
      filter((text: string) => text.length > 2). // Only if the text is longer than 2 characters
      debounce(250).                             // Pause for 250ms
      distinctUntilChanged().                    // Only if the value has changed
      do(() => this.loading.next(true)).
      flatMapLatest((query: string) => this.github.search(query)). // send query to search service
      // here is the real action
      subscribe(
        (repos: string[]) => {
          // fire "term" event
          // the Search component is the listener
          this.loading.next(false);
          this.term.next(repos);
        },
        err => {
          console.log(err);
          this.loading.next(false);
          this.term.next(['ERROR, see console']);
        },
        () => {
          console.log('complete')
          this.loading.next(false);
        }
      )//subscribe
  }

}
