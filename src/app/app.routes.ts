import { Routes } from '@angular/router';
<<<<<<< HEAD
import { HomeComponent } from './home';
// import { AboutComponent } from './about';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  // make sure you match the component type string to the require in asyncRoutes
  // { path: 'about', component: AboutComponent },
  {
    path: 'about', loadChildren: () => System.import('./about').then((comp: any) => {
      console.log(comp);
      return comp.default;
    })
    ,
  },
=======
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
    loadChildren: './modules/+detail/detail.module#DetailModule'
},
  { path: '**',    component: NoContentComponent },
>>>>>>> origin/develop
];
