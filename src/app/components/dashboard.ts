/// <reference path="../../typings/_custom.d.ts" />

/*
 * Angular 2
 */
import {Component, View, Directive} from 'angular2/annotations';
import {ElementRef} from 'angular2/core';

/*
 * TODO: refactor
 * simple example directive that should be in `/directives` folder
 */
@Directive({
  selector: '[x-large]' // using [ ] means selecting attributes
})
class XLarge {
  constructor(public el: ElementRef) {
    // simple dom manipulation to set font size to x-large
    if (this.el.nativeElement.style) {
      this.el.nativeElement.style.fontSize = 'x-large';
    }
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
