import { RouterConfig } from '@angular/router';
import { Home } from './home';
import { NoContent } from './no-content';

export const routes: RouterConfig = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  // make sure you match the component type string to the require in asyncRoutes
  { path: 'about', component: 'About' },
  { path: '**',    component: NoContent },
];

// asyncRoutes is needed for our webpack-toolkit to allow us to resolve the component correctly
export const asyncRoutes: AsyncRoutes = {
  'About': require('es6-promise-loader!./about')
};

// An array of callbacks to be invoked after bootstrap to prefetch async routes
export const prefetchRouteCallbacks: Array<Es6PromiseLoader | Function> = [
  asyncRoutes['About'] // es6-promise-loader returns a function
];


// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings
