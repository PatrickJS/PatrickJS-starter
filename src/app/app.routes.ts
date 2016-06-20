import { RouterConfig } from '@angular/router';
import { Home } from './home';

export const routes: RouterConfig = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  // make sure you match the component type string to the require in asyncRoutes
  { path: 'about', component: 'About' }
];


export const asyncRoutes = {
  'About': require('es6-promise!./about')
};
