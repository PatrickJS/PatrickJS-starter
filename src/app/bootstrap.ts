/// <reference path="../../typings/tsd.d.ts" />

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
import {routerInjectables} from 'angular2/router';
import {httpInjectables} from 'angular2/http';
import {formInjectables} from 'angular2/forms';

/*
 * App Services
 * our collection of injectables services
 */
import {appServicesInjectables} from './services/services';
/*
 * App Component
 * our top level component that holds all of our components
 */
// import {App} from './components/app';

// A simple version of our App without the router or other components
import {App} from './components/app-simple';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Universal/Platform services/bindings into Angular's dependency injection
 */
bootstrap(
  // Top Level Component
  App,

  // AppInjectors
  [
    // Universal injectables
    [
      // Angular's http service
      httpInjectables,

      // Angular's form builder service
      formInjectables,

      // Angular's router
      routerInjectables,

      // Our collection of services from /services
      appServicesInjectables
    ],

    // Platform injectables
    [
      // if we want to use the Just-In-Time change detection
      // jitInjectables

      // if we want to use hashBash url for the router
      // hashlocationInjectables,

      // Our custom injectable that checks if we have support for ShadowDom
      nativeShadowDomInjectables,
    ]

  ]
);
