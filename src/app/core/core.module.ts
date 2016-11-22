import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Import material design module
import { MaterialModule } from '@angular/material';

// import { CardAnimatedComponent } from './components/card-animated';
import { HomeModule } from '../modules/home';

@NgModule({
  declarations: [
    // CardAnimatedComponent
  ],
  imports: [
    CommonModule,
    HomeModule
  ]
})

export class CoreModule {
}
