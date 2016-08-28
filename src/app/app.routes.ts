import { Routes, RouterModule } from '@angular/router';


import { Intro } from './intro';
import { Home } from './home';
import { Projects,Project} from './projects';

import { About } from './about';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: Intro},
  { path: 'home',  component: Home },
  { path: 'intro',  component: Intro },
  { path: 'projects',    component: Projects },
  { path: 'project/:id', component: Project },
  { path: 'about',    component: About },
  { path: '**',    component: Home }
];
