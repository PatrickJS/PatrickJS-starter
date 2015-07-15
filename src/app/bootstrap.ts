/// <reference path="../typings/_custom.d.ts" />

// Angular 2
import {bootstrap} from 'angular2/angular2';


/*
 * Common Injectables
 * our custom helper injectables to configure our app differently using the dependency injection system
 */
import {
  nativeShadowDomInjectables,
  emulatedScopedShadowDomInjectables,
  emulatedUnscopedShadowDomInjectables
} from '../common/shadowDomInjectables';
import {
  jitInjectables,
  dynamicInjectables,
  preGeneratedInjectables
} from '../common/changeDetectionInjectables';
import {
  html5locationInjectables,
  hashlocationInjectables
} from '../common/locationInjectables';

/*
 * Angular Modules
 */
import {httpInjectables} from 'angular2/http';
import {formInjectables} from 'angular2/forms';
import {routerInjectables} from 'angular2/router';

/*
 * App Services
 * our collection of injectables services
 */
import {appServicesInjectables} from './services/services';


/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './components/app';


/*
 * Universal injectables
 */
var universalInjectables = [
  // Angular's http/form/router services/bindings
  httpInjectables,
  formInjectables,
  routerInjectables,

  // Our collection of services from /services
  appServicesInjectables
];

/*
 * Platform injectables
 */
var platformInjectables = [
  // if we want to use the Just-In-Time change detection
  // bestChangeDetectionInjectables,

  // if we want to use hashBash url for the router
  // hashlocationInjectables,

  // Our custom injectable that checks if we have support for ShadowDom
  nativeShadowDomInjectables
];

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Universal/Platform services/bindings into Angular's dependency injection
 */
bootstrap(
  // Top Level Component
  App,

  // AppInjector
  [
    universalInjectables,
    platformInjectables
  ]
);
