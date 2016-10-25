import { AboutComponent } from './about';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail').then((comp: any) => {
      return comp.default;
    }),
  },
  { path: '**',    component: NoContentComponent },
];

export { ROUTES };
