import { Component, Input } from '@angular/core';

import { Family } from '../../../model/family.model';

@Component({
    selector: 'family-detail-contacts',
    template: require('./family-detail-contacts.html'),
    styles: [require('./family-detail-contacts.scss')]
})
export class FamilyDetailContactsComponent {

    @Input()
    public family: Family;

}
