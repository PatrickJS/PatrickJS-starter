// App
export * from './app.component';
export * from './app.service';
export * from './app.routes';

import * as appModule from './app-modules';

import { AppState } from './app.service';

// Application wide providers
export const APP_MODULES = [
  appModule.APP_MODULES,
  AppState,
];
