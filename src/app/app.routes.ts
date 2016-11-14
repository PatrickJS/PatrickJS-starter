import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home';
import { NoContentComponent } from './modules/no-content';
import { AuthenticateGuard} from './shared/services/auth.service';

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
    loadChildren: () => System.import('./modules/+detail').then((comp: any) => {
      return comp.default;
    })
  },
  { path: '**',    component: NoContentComponent },
];
