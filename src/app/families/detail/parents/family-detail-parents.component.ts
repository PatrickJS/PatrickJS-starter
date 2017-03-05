import { Component, Input } from '@angular/core';

import { Family } from '../../../model/family.model';

@Component({
    selector: 'family-detail-parents',
    template: require('./family-detail-parents.html'),
    styles: [require('./family-detail-parents.scss')]
})
export class FamilyDetailParentsComponent {

    @Input()
    public family: Family;

}
