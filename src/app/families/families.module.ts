import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2FloatBtnModule } from 'ng2-float-btn';
import {
  RouterModule,
  PreloadAllModules,
  Routes
} from '@angular/router';

import { FamiliesComponent } from './families.component';
import { FamilyDetailComponent } from './detail/family-detail.component';
import { AddFamilyDialogComponent } from './add-family.component';

export const ROUTES: Routes = [
  { path: 'families/:familyName/:familyId', component: FamilyDetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule.forRoot(),
    Ng2FloatBtnModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  declarations: [
    FamiliesComponent,
    AddFamilyDialogComponent,
    FamilyDetailComponent
  ],
  entryComponents: [AddFamilyDialogComponent]
})
export class FamiliesModule { }
