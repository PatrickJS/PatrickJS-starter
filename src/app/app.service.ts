import {Injectable} from 'angular2/core';
import {HmrState} from 'angular2-hmr';

@Injectable()
export class AppState {
  @HmrState() _state = {}; // you must set the initial value
  constructor() {
  }

  get(prop?: any) {
    return this._state[prop] || this._state;
  }

  set(prop: string, value: any) {
    return this._state[prop] = value;
  }
}
