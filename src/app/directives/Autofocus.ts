/// <reference path="../../typings/_custom.d.ts" />
import {Directive} from 'angular2/annotations';
import {ElementRef} from 'angular2/core';
// Simple example directive that fixes autofocus problem with multiple views
@Directive({
  selector: '[autofocus]' // using [ ] means selecting attributes
})
export class Autofocus {
  constructor(public el: ElementRef) {
    // autofocus fix for multiple views
    if (this.el.nativeElement.focus) {
      this.el.nativeElement.focus();
    }
  }
}
