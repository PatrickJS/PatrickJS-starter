import { Component, ViewChild, OnInit } from '@angular/core';
import { GlobalState } from '../global-state.service';

import { MdDialog, MdDialogRef } from '@angular/material';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';

import { FamilyService } from '../model/family.service';
import { Family } from '../model/family.model';
import { AddFamilyDialogComponent } from './add-family.component';

import _ from 'lodash';

@Component({
    selector: 'families',
    template: require('./families.html'),
    styles: [require('./families.scss')]
})
export class FamiliesComponent implements OnInit {

    public families: Family[];
    public selectedOption: string;
    public mainButton: Ng2FloatBtn;
    public buttons: Ng2FloatBtn[];

    constructor(
        private familyService: FamilyService,
        private _state: GlobalState,
        private dialog: MdDialog) {
        this.mainButton = {
            color: 'primary',
            iconName: 'check'
        };

        this.buttons = [
            {
                color: 'warning',
                iconName: 'add',
                onClick: () => {
                    alert('buton 1 clicked');
                },
            },
            {
                color: 'accent',
                iconName: 'remove',
                onClick: () => {
                    alert('buton 2 clicked');
                }
            }
        ];
    }

    public openDialog() {
        let dialogRef = this.dialog.open(AddFamilyDialogComponent);
        dialogRef.afterClosed().subscribe(() => {
            this.getFamilies();
        });
    }

    public onSubmit({ value, valid }: { value: any, valid: boolean }) {
        if (!valid) {
            return;
        }

        console.log('New family : ', value);
        this.familyService.create({
            name: value.familyName,
            children: [
                {
                    firstName: value.childFirstname
                }
            ]
        });
    }

    public ngOnInit(): void {
        this._state.notifyDataChanged(
            'navbar.title',
            'Les familles'
        );
        this.getFamilies();
    }
    private getFamilies(): void {
        this.familyService.getFamilies().then((families) => {
            console.log('getFamilies : ', families);
            this.families = families;
        });
    }

}
