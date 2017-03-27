import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { FamilyService } from '../../../model/family.service';
import { Family } from '../../../model/family.model';
import { Parent } from '../../../model/parent.model';

@Component({
    selector: 'add-parent',
    templateUrl: './add-parent.html',
})
export class AddParentDialogComponent {

    public family: Family;

    constructor(
        private familyService: FamilyService,
        public dialogRef: MdDialogRef<AddParentDialogComponent>) {
        this.family = dialogRef.config.data.family;
    }

    /**
     * Save new child : send to backend
     */
    public saveNewParent(newName: string, newFirstName: string): void {

        let parent: Parent = {
            name: newName,
            firstName: newFirstName
        };

        this.familyService.addParent(this.family.id, parent).then(() => {
            this.dialogRef.close();
        });

    }

}
