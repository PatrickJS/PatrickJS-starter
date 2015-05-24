/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../custom_typings/ng2.d.ts" />

// Angular 2
import {bootstrap} from 'angular2/angular2';

// include any injectables
import {routerInjectables} from 'angular2/router';
import {shadowDomInjectables} from '../common/checkIfShadowDom';

// Our injectables Services
import {appServicesInjectables} from './services/services';
// Top level component to bootstrap
import {App} from './components/app';

// bootstrap the Angular app with bindings
bootstrap(App, [
  // define any componentInjectableBindings
  routerInjectables,
  // if we want to use ShadowDom
  shadowDomInjectables,
  // our servies
  appServicesInjectables
]);
