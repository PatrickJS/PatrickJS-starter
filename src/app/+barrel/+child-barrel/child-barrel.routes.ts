import { Route } from '@angular/router';

import { ChildBarrelComponent } from './child-barrel.component';

export const routes: Route[] = [
  { path: '', component: ChildBarrelComponent,  pathMatch: 'full' },
];
