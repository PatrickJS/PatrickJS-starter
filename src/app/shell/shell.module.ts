import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './shell.routes';

// Import material design module
import { MaterialModule } from '@angular/material';

import { CardAnimatedComponent } from './components/card-animated';
import { HomeModule } from '../modules/home';
import { ShellComponent } from './shell.component'

@NgModule({
  // bootstrap: [ ShellComponent ],
  declarations: [
    CardAnimatedComponent,
    ShellComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot(),
  ]
})

export class ShellModule {
  static routes = routes;
}
