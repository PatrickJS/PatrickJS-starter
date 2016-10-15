import { Injectable } from '@angular/core';

export type InternalStateType = {
  [key: string]: any,
};

@Injectable()
export class AppState {
  private _state: InternalStateType = { };

  // already return a clone of the current state
  get state(): InternalStateType {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get<T>(prop?: T): T;
  public get(prop?: any): any {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set<T>(prop: string, value: T): T;
  public set(prop: string, value: any): any {
    // internally mutate our state
    return this._state[prop] = value;
  }

  private _clone(object: InternalStateType): InternalStateType {
    // simple object clone
    return <InternalStateType> JSON.parse(JSON.stringify(object));
  }
}
