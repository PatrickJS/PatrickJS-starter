import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { FamilyService } from '../../../model/family.service';
import { Family } from '../../../model/family.model';
import { Contact } from '../../../model/contact.model';

@Component({
    selector: 'add-contact',
    templateUrl: './add-contact.html',
})
export class AddContactDialogComponent {

    public family: Family;

    constructor(
        private familyService: FamilyService,
        public dialogRef: MdDialogRef<AddContactDialogComponent>) {
        this.family = dialogRef.config.data.family;
    }

    /**
     * Save new contact : send to backend
     */
    public saveNewContact(newName: string, newFirstName: string): void {

        let contact: Contact = {
            name: newName,
            firstName: newFirstName
        };

        this.familyService.addContact(this.family.id, contact).then(() => {
            this.dialogRef.close();
        });

    }

}
