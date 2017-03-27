import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { FamilyService } from '../../../model/family.service';
import { Family } from '../../../model/family.model';
import { Child } from '../../../model/child.model';

@Component({
    selector: 'add-child',
    templateUrl: './add-child.html',
})
export class AddChildDialogComponent {

    public family: Family;

    constructor(
        private familyService: FamilyService,
        public dialogRef: MdDialogRef<AddChildDialogComponent>) {
        this.family = dialogRef.config.data.family;
    }

    /**
     * Save new child : send to backend
     */
    public saveNewChild(newFirstName: string): void {

        console.log('firstName : ', newFirstName);

        let child: Child = {
            firstName: newFirstName
        };

        this.familyService.addChild(this.family.id, child).then(() => {
            this.dialogRef.close();
        });

    }

    public onSubmit(form: any): void {
        console.log('onSubmit : ', form);
    }
}
