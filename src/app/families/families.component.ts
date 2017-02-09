import { Component, ViewChild, OnInit } from '@angular/core';

import { FamilyService } from '../model/family.service';
import { Family } from '../model/family.model';

@Component({
    selector: 'families',
    template: require('./families.html'),
    styles: [require('./families.scss')]
})
export class FamiliesComponent implements OnInit {
    // @ViewChild('addFamilyModal')
    // public addFamilyModal: ModalDirective;

    public families: Family[];

    constructor(private familyService: FamilyService) {

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

        // this.addFamilyModal.hide();
    }

    public ngOnInit(): void {
        this.getFamilies();
    }
    private getFamilies(): void {
        this.familyService.getFamilies().then((families) => this.families = families);
    }

}
