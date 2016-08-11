import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { RouterConfig } from '@angular/router';
import { Home } from './home';
import { About } from './about';
import { Detail } from './+detail';

import { NoContent } from './no-content';

import { DataResolver } from './app.resolver';

export const routes: RouterConfig = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'about', component: About},
  { path: 'detail', component: Detail},
  { path: '**',    component: NoContent },
];
