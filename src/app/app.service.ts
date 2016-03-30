import {Injectable} from 'angular2/core';
import {HmrState} from 'angular2-hmr';

@Injectable()
export class AppState {
  @HmrState() _state = {};

  constructor() {

  }

  get state() {
    return this._state = this._clone(this._state);
  }
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    const state = this.state;
    return state[prop] || state;
  }

  set(prop: string, value: any) {
    return this._state[prop] = value;
  }


  _clone(object) {
    return JSON.parse(JSON.stringify( object ));
  }
}
