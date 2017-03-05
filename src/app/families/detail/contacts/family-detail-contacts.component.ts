import { Component, Input } from '@angular/core';

import { MdDialog, MdDialogRef, MdDialogConfig, MdTabChangeEvent } from '@angular/material';

import { AddContactDialogComponent } from './add-contact.component';

import { Family } from '../../../model/family.model';
import { Contact } from '../../../model/contact.model';

@Component({
    selector: 'family-detail-contacts',
    template: require('./family-detail-contacts.html'),
    styles: [require('./family-detail-contacts.scss')]
})
export class FamilyDetailContactsComponent {

    @Input()
    public family: Family;

    constructor(private dialog: MdDialog) {
    }

    public editContact(idx: number, contact: Contact) {
        let config: MdDialogConfig = {
            data: {
                family: this.family,
                contact
            }
        };
        let dialogRef = this.dialog.open(AddContactDialogComponent, config);
        dialogRef.afterClosed().subscribe((actionDone) => {
            if (actionDone === 'UPDATE') {
            this.family.contacts[idx] = contact;
            } else if (actionDone === 'DELETE') {
                this.family.contacts.splice(idx, 1);
            }
        });
    }

}
