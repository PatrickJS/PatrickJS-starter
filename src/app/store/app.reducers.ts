import * as AppActions from './app.actions'
import { ActionReducerMap } from '@ngrx/store';

export interface State {
  state: string
}

const initialState: State = {
  state: "",
};

export function appReducer(state = initialState, action: AppActions.AppActions) {
  switch (action.type) {
    case (AppActions.SET_STATE):
      return {
        ...state,
        state: action.payload
      };
    default:
      return state;
  }
}
export interface AppState {
  app: State
}

export const reducers: ActionReducerMap<AppState> = {
  app: appReducer,
};
