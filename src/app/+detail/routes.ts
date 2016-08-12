import { provideRouter, Routes } from '@angular/router';
import { Detail } from './detail.component';
import { Index } from './index.component';



export const detailRoutes: Routes = [
  {
    path: 'detail',
    component: Detail,
    children: [
      { path: '', component: Index }
    ]
  }
];
