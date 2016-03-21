import {Injectable} from 'angular2/core';
import {WebpackState} from 'angular2-hmr';

@Injectable()
export class AppState {
  _state = {}; // you must set the initial value
  constructor(webpackState: WebpackState) {
    this._state = webpackState.select('AppState', () => this._state);
  }

  get(prop?: any) {
    return this._state[prop] || this._state;
  }

  set(prop: string, value: any) {
    return this._state[prop] = value;
  }
}
