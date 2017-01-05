import { BarrelComponent } from './barrel.component';

export const routes = [
  { path: '', children: [
    { path: '', component: BarrelComponent },
    { path: 'child-barrel', loadChildren: './+child-barrel#ChildBarrelModule' }
  ]},
];
