import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GlobalState } from '../../../../../global-state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MdSnackBar } from '@angular/material';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';

import { ChildService } from '../../../../../model/child.service';
import { Family } from '../../../../model/family.model';
import { Child } from '../../../../../model/child.model';

import _ from 'lodash';

@Component({
    selector: 'child-infos',
    template: require('./child-infos.html'),
    styles: [require('./child-infos.scss')]
})
export class ChildInfosComponent {

    public familyName: string;
    public familyId: number;
    public childName: string;
    public childId: number;

    @Input()
    public child: Child;
    @Output()
    public childChange = new EventEmitter<Child>();

    constructor(private childService: ChildService,
        private snackBar: MdSnackBar,
        private router: Router,
        private route: ActivatedRoute,
        private _state: GlobalState
    ) {
        this.route.params.forEach((params: Params) => {
            this.familyId = Number(params['familyId']);
            this.familyName = params['familyName'];
            this.childId = Number(params['childId']);
            this.childName = params['childName'];
        });
    }

    /**
     * Send firstName to backend
     * @param newFirstName Send update to backend
     */
    public saveFirstName(newFirstName: string) {
        if (this.child.firstName === newFirstName) {
            return;
        }
        this.child.firstName = newFirstName;
        this.childService.update(this.child).then((updatedChild) => {
            this.child = updatedChild;
            this._state.notifyDataChanged(
                'navbar.title',
                this.child.firstName + ' ' + this.familyName
            );
            this.snackBar.open('Modification enregistrée !', null, {
                duration: 2000,
            });
            this.router.navigate(['/families',
                this.familyName,
                this.familyId,
                this.child.firstName,
                this.childId]);
        });
    }

}
