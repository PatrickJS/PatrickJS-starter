import {ElementRef, AfterViewInit, Directive} from '@angular/core';

@Directive({
    selector: '[zasFocusMe]'
})
export class FocusDirective implements AfterViewInit {
    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        this.el.nativeElement.focus();
    }
}
