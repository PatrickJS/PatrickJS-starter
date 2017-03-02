import { Component, ViewChild, OnInit } from '@angular/core';
import { GlobalState } from '../../global-state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MdDialog, MdDialogRef } from '@angular/material';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';

import { FamilyService } from '../model/family.service';
import { Family } from '../model/family.model';
import { AddFamilyDialogComponent } from './add-family.component';

@Component({
    selector: 'family-detail',
    template: require('./family-detail.html')
})
export class FamilyDetailComponent implements OnInit {

    public familyName: string;
    public familyId: number;

    constructor(
        private _state: GlobalState,
        private route: ActivatedRoute) {
        this.route.params.forEach((params: Params) => {
            console.log('name : ', params['familyName']);
            console.log('name : ', params['familyId']);
            this.familyId = params['familyId'];
            this.familyName = params['familyName'];
        });
    }

    public ngOnInit(): void {
        this._state.notifyDataChanged('navbar.title',
            'Famille "' + this.familyName + '"'
        );
        this._state.notifyDataChanged('breadcrumb',
            [
                {
                    label: 'Les familles',
                    link: '/families'
                }
            ]
        );
    }
}
