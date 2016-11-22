import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './core.routes';

// Import material design module
import { MaterialModule } from '@angular/material';

import { CardAnimatedComponent } from './components/card-animated';
import { HomeModule } from '../modules/home';
import { CoreComponent } from './core.component'

@NgModule({
  // bootstrap: [ CoreComponent ],
  declarations: [
    CardAnimatedComponent,
    CoreComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot(),
  ]
})

export class CoreModule {
  static routes = routes;
}
