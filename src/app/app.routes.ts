import { provideRouter, Routes } from '@angular/router';
import { Home } from './home';
import { About } from './about';
import { detailRoutes  } from './+detail';
import { Demo } from './demo';

import { NoContent } from './no-content';

import { DataResolver } from './app.resolver';

export const routes: Routes  = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'demo',  component: Demo },
  { path: 'about', component: About},
  ...detailRoutes,
  { path: '**',    component: NoContent },
];


export const APP_ROUTE_PROVIDER = provideRouter(routes);
