/// <reference path="../../../typings/tsd.d.ts" />
import {Directive, ElementRef} from 'angular2/angular2';
// Simple example directive that fixes autofocus problem with multiple views
@Directive({
  selector: '[autofocus]' // using [ ] means selecting attributes
})
export class Autofocus {
  constructor(public el: ElementRef) {
    // autofocus fix for multiple views
    this.el.domElement.focus();
  }
}
