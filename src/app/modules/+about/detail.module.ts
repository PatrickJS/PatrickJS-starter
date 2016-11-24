import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DetailComponent } from './detail.component';
import { routes } from './detail.routes';
import { FsDialogComponent } from '../../shared/components/fs-dialog';

@NgModule({
  declarations: [
    DetailComponent,
    FsDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})

export class DetailModule {
  static routes = routes;
}
