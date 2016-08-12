import {Component} from '@angular/core';

@Component({
    selector: 'header',
    template: '<ng-content></ng-content>'
})
export class TDHeader {}

export const MD_HEADER_DIRECTIVES = [TDHeader];
