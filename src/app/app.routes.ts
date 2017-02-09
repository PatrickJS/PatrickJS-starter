import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { PlanningComponent } from './planning/planning.component';
import { FamiliesComponent } from './families/families.component';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: PlanningComponent },
  { path: 'planning',  component: PlanningComponent },
  { path: 'families',  component: FamiliesComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: '**',    component: NoContentComponent },
];
