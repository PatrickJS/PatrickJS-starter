import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { FamilyService } from '../../../model/family.service';
import { ContactService } from '../../../model/contact.service';
import { Family } from '../../../model/family.model';
import { Contact } from '../../../model/contact.model';

@Component({
    selector: 'add-contact',
    templateUrl: './add-contact.html',
})
export class AddContactDialogComponent {

    public family: Family;
    public contact: Contact = new Contact();

    constructor(
        private familyService: FamilyService,
        private contactService: ContactService,
        public dialogRef: MdDialogRef<AddContactDialogComponent>) {
        this.family = dialogRef.config.data.family;
        if (dialogRef.config.data.contact && dialogRef.config.data.contact.id) {
            this.contact = dialogRef.config.data.contact;
        }
    }

    /**
     * Delete current contact
     */
    public deleteContact() {
        this.contactService.delete(this.contact.id).then(() => {
            this.dialogRef.close('DELETE');
        });
    }

    /**
     * Save contact : send to backend
     */
    public saveContact(newName: string, newFirstName: string, newPhone: string, newEmail: string,
        newLink: string): void {

        if (this.contact && this.contact.id) {
            this.contact.name = newName;
            this.contact.firstName = newFirstName;
            this.contact.email = newEmail;
            this.contact.phoneNumber = newPhone;
            this.contact.link = newLink;

            this.contactService.update(this.contact).then(() => {
                this.dialogRef.close('UPDATE');
            });
        } else {
            let contact: Contact = {
                name: newName,
                firstName: newFirstName,
                phoneNumber: newPhone,
                email: newEmail,
                link: newLink
            };
            this.familyService.addContact(this.family.id, contact).then(() => {
                this.dialogRef.close('CREATE');
            });
        }

    }

}
