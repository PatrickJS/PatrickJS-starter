import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FamiliesComponent } from './families.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    FamiliesComponent
  ],
  exports: [
      FamiliesComponent
  ]
})
export class FamiliesModule { }
