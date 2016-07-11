import * as appModule from './app-modules';

import * as acAppModule from './ac-app';


export {App} from './app';
export const APP_MODULES = [
  appModule.APP_MODULES,
  acAppModule.APP_MODULES
];
