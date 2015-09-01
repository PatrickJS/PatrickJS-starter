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
  constructor(el: ElementRef, renderer: Renderer) {
    // simple dom manipulation to set font size to x-large
    renderer.setElementStyle(el, 'fontSize', 'x-large');
  }
}

// Simple component with custom directive example
@Component({
  selector: 'dashboard'
})
@View({
  directives: [ XLarge ],
  template: `
  <style>
    span[x-large] {
      color: red;
    }
  </style>
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
