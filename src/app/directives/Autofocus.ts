/// <reference path="../../typings/_custom.d.ts" />
import {Directive, ElementRef} from 'angular2/angular2';
import {Renderer} from 'angular2/render';

// Simple example directive that fixes autofocus problem with multiple views
@Directive({
  selector: '[autofocus]' // using [ ] means selecting attributes
})
export class Autofocus {
  constructor(el: ElementRef, renderer: Renderer) {
    // autofocus fix for multiple views
    renderer.invokeElementMethod(el, 'focus', []);
  }
}
