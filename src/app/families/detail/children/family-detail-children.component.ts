import { Component, Input } from '@angular/core';

import { Family } from '../../../model/family.model';

@Component({
    selector: 'family-detail-children',
    template: require('./family-detail-children.html'),
    styles: [require('./family-detail-children.scss')]
})
export class FamilyDetailChildrenComponent {

    @Input()
    public family: Family;

}
