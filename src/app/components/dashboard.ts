/// <reference path="../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, Directive, ElementRef} from 'angular2/angular2';

// Simple example directive that should be in `/directives` folder
// Todo: refactor
@Directive({
  selector: '[x-large]' // using [ ] means selecting attributes
})
class XLarge {
  constructor(public el: ElementRef) {
    // simple dom manipulation to set font size to x-large
    this.el.domElement.style.fontSize = 'x-large';
  }
}

// Simple component
@Component({
  selector: 'dashboard'
})
@View({
  directives: [ XLarge ],
  template: `
  <style> span[x-large] { color: red; } </style>

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
