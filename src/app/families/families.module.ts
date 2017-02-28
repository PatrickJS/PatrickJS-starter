import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2FloatBtnModule } from 'ng2-float-btn';

import { FamiliesComponent } from './families.component';
import { AddFamilyDialogComponent } from './add-family.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule.forRoot(),
    Ng2FloatBtnModule
  ],
  declarations: [
    FamiliesComponent,
    AddFamilyDialogComponent
  ],
  entryComponents: [AddFamilyDialogComponent]
})
export class FamiliesModule { }
