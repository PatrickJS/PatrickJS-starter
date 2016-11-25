import { HttpModule, JsonpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';
import { DetailComponent } from './detail.component';
import { routes } from './detail.routes';
import { FsDialogComponent } from '../../shared/components/fs-dialog';
import { FsYoutubeAPIComponent } from '../../shared/components/fs-youtube-api';
import { fsYoutubeApiPipeFilterSearch } from '../../shared/components/fs-youtube-api'; // import our pipe here

@NgModule({
  declarations: [
    DetailComponent,
    FsDialogComponent,
    FsYoutubeAPIComponent,
    fsYoutubeApiPipeFilterSearch
  ],
  imports: [
    CommonModule,
    HttpModule,
    JsonpModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot(),
    // BrowserModule,
    // FormsModule
  ]
})

export class DetailModule {
  static routes = routes;
}
