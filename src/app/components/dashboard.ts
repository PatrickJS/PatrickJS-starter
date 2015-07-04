/// <reference path="../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, Directive} from 'angular2/annotations';
import {ElementRef} from 'angular2/core';

// Simple example directive that should be in `/directives` folder
// Todo: refactor
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

// Simple component
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
