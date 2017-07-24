import { Route } from '@angular/router';

import { DetailComponent } from './detail.component';

export const routes: Route[] = [
  { path: '', children: [
    { path: '', component: DetailComponent },
    { path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
  ]},
];
