import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { About } from './about';
import { NoContent } from './no-content';
import { Alert } from './alert';
import {DatePicker} from "./datepicker";
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'about', component: About },
  { path: 'alert', component: Alert },
  { path: 'date-picker', component: DatePicker },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
  },
  { path: '**',    component: NoContent },
];
