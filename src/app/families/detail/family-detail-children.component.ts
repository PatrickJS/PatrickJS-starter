import { Component, Input } from '@angular/core';
import { GlobalState } from '../../global-state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MdDialog, MdDialogRef } from '@angular/material';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';

import { FamilyService } from '../model/family.service';
import { Family } from '../../model/family.model';
import { AddFamilyDialogComponent } from './add-family.component';

@Component({
    selector: 'family-detail-children',
    template: require('./family-detail-children.html'),
    styles: [require('./family-detail-children.scss')]
})
export class FamilyDetailChildrenComponent {

    @Input()
    public family: Family;

}
