/// <reference path="../../typings/_custom.d.ts" />
import {Pipe, PipeFactory} from 'angular2/angular2';
import {ObservablePipe} from 'angular2/pipes';
import {async} from 'angular2/src/change_detection/change_detection';
import * as Rx from 'rx';

export function isObservable(obs) {
  return obs && typeof obs.subscribe === 'function';
}

export class RxPipe extends ObservablePipe {
  _subscription: any;
  _observable: any;
  constructor(ref) { super(ref); }
  supports(obs) { return isObservable(obs); }
  _subscribe(obs) {
    this._observable = obs;
    this._subscription = obs.subscribe(
      value => this._updateLatestValue(value),
      e => { throw e; }
    );
  }
  transform(value: any, args?: List<any>): any {
    return super.transform(value, args);
  }
  onDestroy(): void {
    return super.onDestroy();
  }
}

export class RxPipeFactory implements PipeFactory {
  supports(obs) { return isObservable(obs); }
  create(cdRef): Pipe { return new RxPipe(cdRef); }
}

export var rxAsync = [ new RxPipeFactory() ].concat(async);
