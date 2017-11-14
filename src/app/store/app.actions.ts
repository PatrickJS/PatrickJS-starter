import { Action } from '@ngrx/store';

export const SET_STATE = 'SET_STATE';

export class SetState {
  readonly type = SET_STATE;

  constructor(public payload: string) { }
}


export type AppActions = SetState;
