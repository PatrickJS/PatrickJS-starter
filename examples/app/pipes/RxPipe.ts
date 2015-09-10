/// <reference path="../../typings/_custom.d.ts" />
import {Pipe, ChangeDetectorRef} from 'angular2/angular2';
import {AsyncPipe} from "angular2/pipes";
import * as Rx from 'rx';

export function isObservable(obs) {
  return obs && typeof obs.subscribe === 'function';
}

export class RxStrategy {
  createSubscription(async, updateLatestValue) {
    return async.subscribe(updateLatestValue, e => { throw e; });
  }

  dispose(subscription) {
    subscription.dispose();
  }

  onDestroy(subscription) {
    subscription.dispose();

  }
}

export const RX_STRATEGY: RxStrategy = new RxStrategy();

@Pipe({
  name: 'rx'
})
export class RxPipe extends AsyncPipe {
  constructor(public _ref: ChangeDetectorRef) {
    super(_ref);
  }

  supports(obs): boolean {
    return isObservable(obs);
  }

  _selectStrategy(obj: Rx.Observable<any>): any {
    return RX_STRATEGY;
  }

}
