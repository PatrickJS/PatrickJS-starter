/// <reference path="../../typings/tsd.d.ts" />

// Angular 2
import {bootstrap} from 'angular2/angular2';

// Angular's router injectables services/bindings
import {routerInjectables} from 'angular2/router';
// Angular's form injectables services/bindings
import {formInjectables} from 'common/formInjectables';

// Our custom injectable that checks if ShadowDom is available to inject
import {shadowDomInjectables} from 'common/shadowDomInjectables';

// Our custom injectable that uses Just-In-Time change detection
// import {jitInjectables} from 'common/changeDetectionInjectables';

// Our collection of injectables services
import {appServicesInjectables} from './services/services';


// Our top level component that holds all of our components
import {App} from './components/app';

/*
  Bootstrap our Angular app with our top level component `App`
  and inject our global services/bindings into Angular's dependency injection
*/
bootstrap(
  // Top Level Component
  App,

  // AppInjectors
  [
    // Our collection of services from /services
    appServicesInjectables,


    // Our custom injectable that checks if we have support for ShadowDom
    shadowDomInjectables,

    // if we want to use the Just-In-Time change detection
    // jitInjectables,

    // Angular's form builder service
    formInjectables,

    // Angular's router
    routerInjectables
  ]
);
