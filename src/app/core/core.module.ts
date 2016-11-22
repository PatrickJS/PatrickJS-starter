import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Import material design module
import { MaterialModule } from '@angular/material';

import { CardAnimatedModule, CardAnimatedComponent } from './components/card-animated';
import { HomeModule } from '../modules/home';

@NgModule({
  declarations: [
    CardAnimatedComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    CardAnimatedModule,
    MaterialModule.forRoot()
  ]
})

export class CoreModule {
}
