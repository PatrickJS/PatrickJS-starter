import { Component, ViewChild, OnInit } from '@angular/core';
import { GlobalState } from '../../global-state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MdDialog,  MdDialogConfig, MdTabChangeEvent } from '@angular/material';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';

import { FamilyService } from '../../model/family.service';
import { Family } from '../../model/family.model';
import { AddChildDialogComponent } from './children/add-child.component';
import { AddParentDialogComponent } from './parents/add-parent.component';
import { AddContactDialogComponent } from './contacts/add-contact.component';

@Component({
    selector: 'family-detail',
    template: require('./family-detail.html'),
    styles: [require('./family-detail.scss')]

})
export class FamilyDetailComponent implements OnInit {

    public familyName: string;
    public familyId: number;
    public family: Family;
    public showAddButton: Boolean = true;
    private currentTabIndex: number = 0;

    constructor(
        private _state: GlobalState,
        private route: ActivatedRoute,
        private familyService: FamilyService,
        private dialog: MdDialog) {
        this.route.params.forEach((params: Params) => {
            console.log('name : ', params['familyName']);
            console.log('name : ', params['familyId']);
            this.familyId = params['familyId'];
            this.familyName = params['familyName'];
        });
    }

    public ngOnInit(): void {
        this._state.notifyDataChanged(
            'navbar.title',
            'Famille "' + this.familyName + '"'
        );
        this._state.notifyDataChanged(
            'breadcrumb',
            [
                {
                    label: 'Les familles',
                    link: '/families'
                }
            ]
        );
        this.getFamily();
    }

    /**
     * Handle tab change to display or not add button
     * @param event
     */
    public tabChanged($event: MdTabChangeEvent) {

        this.currentTabIndex = $event.index;

        // Hide on "Facturation" tab
        if ($event.index === 3) {
            this.showAddButton = false;
        } else {
            this.showAddButton = true;
        }

    }

    /**
     * Handle click on add button to open add modal
     */
    public openDialog() {
        let dialogRef;
        let config: MdDialogConfig = {
            data: {
                family: this.family
            }
        };
        if (this.currentTabIndex === 0) {
            dialogRef = this.dialog.open(AddChildDialogComponent, config);
        }
        if (this.currentTabIndex === 1) {
            dialogRef = this.dialog.open(AddParentDialogComponent, config);
        }
        if (this.currentTabIndex === 2) {
            dialogRef = this.dialog.open(AddContactDialogComponent, config);
        }
        dialogRef.afterClosed().subscribe(() => {
            this.getFamily();
        });
    }

    private getFamily(): void {
        this.familyService.getFamily(this.familyId).then((family) => {
            this.family = family;
        });
    }
}
