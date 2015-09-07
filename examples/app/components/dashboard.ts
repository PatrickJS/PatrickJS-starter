/// <reference path="../../typings/_custom.d.ts" />

/*
 * Angular 2
 */
import {Component, View, Directive, ElementRef} from 'angular2/angular2';
import {Renderer} from 'angular2/render';

/*
 * TODO: refactor
 * simple example directive that should be in `/directives` folder
 */
@Directive({
  selector: '[x-large]' // using [ ] means selecting attributes
})
class XLarge {
  constructor(element: ElementRef, renderer: Renderer) {
    // simple DOM manipulation to set font size to x-large
    renderer.setElementStyle(element, 'fontSize', 'x-large');
  }
}

// Simple component with custom directive example
@Component({
  selector: 'dashboard'
})
@View({
  directives: [ XLarge ],
  styles: [`
    span[x-large] {
      color: red;
    }
  `],
  template: `
  <div>
    <h2>Dashboard</h2>
    <span x-large>Extra Large Font Directive</span>
  </div>
  `
})
export class Dashboard {
  constructor() {

  }
}
