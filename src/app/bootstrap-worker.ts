/*
 * Providers provided by Angular
 */
import {FORM_PROVIDERS} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
// import {ROUTER_PROVIDERS} from 'angular2/router';
import {bootstrapWebWorker} from 'angular2/web_worker/worker';


/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
bootstrapWebWorker(App, [
  // These are dependencies of our App
  FORM_PROVIDERS,
  // ROUTER_PROVIDERS,
  HTTP_PROVIDERS
]);
