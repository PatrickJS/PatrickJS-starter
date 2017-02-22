import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'add-family',
    templateUrl: './add-family.html',
})
export class AddFamilyDialogComponent {
    constructor(public dialogRef: MdDialogRef<AddFamilyDialogComponent>) { }
}
