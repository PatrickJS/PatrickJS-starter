/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../custom_typings/ng2.d.ts" />

import {bootstrap} from 'angular2/angular2';

// include any injectables
import {routerInjectables} from 'angular2/router';

// Top level app to bootstrap
import {App} from 'components/app';

// bootstrap the Angular app with bindings
bootstrap(App, [
  // define any componentInjectableBindings
  routerInjectables
]);
