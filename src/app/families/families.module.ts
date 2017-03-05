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
import { Mv3CommonModule } from '../common/common.module';

import { FamiliesComponent } from './families.component';
import { AddFamilyDialogComponent } from './add-family.component';

import { FamilyDetailComponent } from './detail/family-detail.component';
import { ChildDetailComponent } from './detail/children/detail/child-detail.component';

import { FamilyDetailChildrenComponent } from './detail/children/family-detail-children.component';
import { AddChildDialogComponent } from './detail/children/add-child.component';

import { FamilyDetailParentsComponent } from './detail/parents/family-detail-parents.component';
import { AddParentDialogComponent } from './detail/parents/add-parent.component';

import { FamilyDetailContactsComponent } from './detail/contacts/family-detail-contacts.component';
import { AddContactDialogComponent } from './detail/contacts/add-contact.component';

import { DeleteChildDialogComponent } from './detail/children/detail/delete-child.component';
import { InlineEditComponent } from './detail/children/detail/inline-edit.component';

import { ChildInfosComponent } from './detail/children/detail/infos';

export const ROUTES: Routes = [
  { path: 'families/:familyName/:familyId', component: FamilyDetailComponent },
    { path: 'families/:familyName/:familyId/:childName/:childId', component: ChildDetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    Ng2FloatBtnModule,
    Mv3CommonModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  declarations: [
    FamiliesComponent,
    AddFamilyDialogComponent,
    FamilyDetailComponent,
    FamilyDetailChildrenComponent,
    AddChildDialogComponent,
    FamilyDetailParentsComponent,
    AddParentDialogComponent,
    FamilyDetailContactsComponent,
    AddContactDialogComponent,
    ChildDetailComponent,
    DeleteChildDialogComponent,
    InlineEditComponent,
    ChildInfosComponent
  ],
  entryComponents: [
    AddFamilyDialogComponent,
    AddChildDialogComponent,
    AddParentDialogComponent,
    AddContactDialogComponent,
    DeleteChildDialogComponent
  ]
})
export class FamiliesModule { }
