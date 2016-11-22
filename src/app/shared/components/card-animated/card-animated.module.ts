import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Import material design module
import { MaterialModule } from '@angular/material';

import { cardAnimatedComponent } from '../shared/components/cardAnimated';

@NgModule({
  declarations: [
    cardAnimatedComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule.forRoot()
  ]
})

export class cardAnimatedModule {

}
