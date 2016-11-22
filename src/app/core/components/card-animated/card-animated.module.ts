import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Import material design module
import { MaterialModule } from '@angular/material';

import { CardAnimatedComponent } from './card-animated.component';

@NgModule({
  declarations: [
    CardAnimatedComponent,
  ],
  exports: [
    CardAnimatedComponent
  ],
  imports: [
    CommonModule,
    MaterialModule.forRoot()
  ]
})

export class CardAnimatedModule {

}
