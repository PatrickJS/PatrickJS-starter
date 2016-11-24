import { HttpModule, JsonpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@angular/material';
import { DetailComponent } from './detail.component';
import { routes } from './detail.routes';
import { FsDialogComponent } from '../../shared/components/fs-dialog';
import { FsYoutubeAPIComponent } from '../../shared/components/fs-youtube-api';

@NgModule({
  declarations: [
    DetailComponent,
    FsDialogComponent,
    FsYoutubeAPIComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    JsonpModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot()
  ]
})

export class DetailModule {
  static routes = routes;
}
