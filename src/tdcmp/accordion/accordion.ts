import {Component, ElementRef, AfterContentInit, Input,
  Output, EventEmitter} from '@angular/core';
import {TDaccordionTab} from './accordiontab';

@Component({
    selector: 'td-accordion',
    template: `
        <div [ngClass]="'ui-accordion ui-widget ui-helper-reset'" [ngStyle]="style" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `
})
export class TDaccordion {

    @Input() multiple: boolean;

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @Output() onOpen: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;

    public tabs: TDaccordionTab[] = [];

    constructor(protected el: ElementRef) {}

    addTab(tab: TDaccordionTab) {
        this.tabs.push(tab);
    }
}

export const MD_ACCORDION_DIRECTIVES = [TDaccordion];
