import { Route } from '@angular/router';

import { BarrelComponent } from './barrel.component';

export const routes: Route[] = [
  { path: '', children: [
    { path: '', component: BarrelComponent },
    { path: 'child-barrel', loadChildren: './+child-barrel#ChildBarrelModule' }
  ]},
];
