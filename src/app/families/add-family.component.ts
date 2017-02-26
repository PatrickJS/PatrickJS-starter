import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { FamilyService } from '../model/family.service';
import { ChildService } from '../model/child.service';
import { Family } from '../model/family.model';
import { Child } from '../model/child.model';

@Component({
    selector: 'add-family',
    templateUrl: './add-family.html',
})
export class AddFamilyDialogComponent {
    constructor(
        private familyService: FamilyService,
        private childService: ChildService,
        public dialogRef: MdDialogRef<AddFamilyDialogComponent>) { }

    /**
     * Save new family : send to backend
     */
    public saveNewFamily(newName: string, newFirstName: string): void {
        console.log('name : ', newName);
        console.log('firstName : ', newFirstName);

        let family: Family = new Family();
        family.name = newName;

        console.log('family : ', family);

        this.familyService.create(family).then((newFamily) => {
            let child: Child = {
                firstName: newFirstName,
                familyId: newFamily.id
            };
            this.childService.create(child).then((newChild) => {
                this.dialogRef.close();
            });

        });

    }

    public onSubmit(form: any): void {
        console.log('onSubmit : ', form);
    }
}
