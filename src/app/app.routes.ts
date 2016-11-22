import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home';
import { NoContentComponent } from './modules/no-content';
import { AuthenticateGuard } from './shared/services/auth.service';
import { CoreComponent } from './core';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'detail',
    canActivate: [AuthenticateGuard],
    canLoad: [AuthenticateGuard],
    loadChildren: './modules/+detail/detail.module#DetailModule'
},
  { path: '**',    component: NoContentComponent },
];
