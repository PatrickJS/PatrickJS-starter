import { Routes } from '@angular/router';
import { AuthenticateGuard } from './shared/services/auth.service';


export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthenticateGuard],
    canLoad: [AuthenticateGuard],
    loadChildren: './modules/+home/home.module#HomeModule'
  },
  {
    path: 'home',
    canActivate: [AuthenticateGuard],
    canLoad: [AuthenticateGuard],
    loadChildren: './modules/+home/home.module#HomeModule'
  },
  {
    path: 'about',
    canActivate: [AuthenticateGuard],
    canLoad: [AuthenticateGuard],
    loadChildren: './modules/+about/detail.module#DetailModule'
  },
  { 
    path: '**', 
    loadChildren: './modules/+no-content/no-content.module#NoContentModule'
  }
];
