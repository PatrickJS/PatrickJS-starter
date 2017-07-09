import { Route } from '@angular/router';

import { ChildDetailComponent } from './child-detail.component';

export const routes: Route[] = [
  { path: '', component: ChildDetailComponent,  pathMatch: 'full' },
];
