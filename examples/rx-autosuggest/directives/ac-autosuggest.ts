/// <reference path="../../typings/_custom.d.ts" />

// Angular 2
import {Directive, View, EventEmitter, ElementRef} from 'angular2/angular2';

// RxJs
import * as Rx from 'rx';

import {GithubService} from '../services/GithubService';

@Directive({
  selector: 'input[type=text][ac-autosuggest-github]',
  events:   [ 'results', 'loading' ],
  bindings: [ GithubService ]
})
export class AcAutosuggestGithub {
  results: EventEmitter = new EventEmitter();
  loading: EventEmitter = new EventEmitter();

  constructor(private el: ElementRef, public github: GithubService) {

  }

  // Lifecycle hook
  onInit() {

    (<any>Rx).Observable.fromEvent(this.el.nativeElement, 'input')
      .map(e => e.target.value)                  // Project the text from the input
      .filter(text => text.length > 2)           // Only if the text is longer than 2 characters
      .debounce(250)                             // Pause for 250ms
      .distinctUntilChanged()                    // Only if the value has changed
      .do(zone.bind(() => this.loading.next(true)))
      .flatMapLatest(query => this.github.search(query)) // send query to search service
      .do(zone.bind(() => this.loading.next(false)))
      // here is the real action
      .subscribe(
        // onNext
        zone.bind(repos => {
          // fire "results" event
          // the Search component is the listener
          this.results.next(repos);
        }),
        // onError
        zone.bind(err => {
          console.log(err);
          this.results.next(['ERROR, see console']);
        }),
        // onComplete
        () => {
          console.log('complete');
        }
      )//subscribe
  }

}
