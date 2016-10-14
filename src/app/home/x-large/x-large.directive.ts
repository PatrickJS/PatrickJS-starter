import { Directive, ElementRef, Renderer } from '@angular/core';
/*
 * Directive
 * XLarge is a simple directive to show how one is made
 */
@Directive({
  selector: '[myXLarge]', // using [ ] means selecting attributes
})
export class XLargeDirective {
  constructor(element: ElementRef, renderer: Renderer) {
    // simple DOM manipulation to set font size to myXLarge
    // `nativeElement` is the direct reference to the DOM element
    // element.nativeElement.style.fontSize = 'myXLarge';

    // for server/webworker support use the renderer
    renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
  }
}
