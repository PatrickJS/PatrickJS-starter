import { Routes } from '@angular/router';
import { AuthenticateGuard } from './shared/services/auth.service';
import { NoContentComponent } from './shared/components/no-content/no-content.component';


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
    loadChildren: './modules/+about/about.module#AboutModule'
  },
  {
    path: '**',
    component: NoContentComponent
  }

];
