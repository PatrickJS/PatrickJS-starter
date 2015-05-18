/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../custom_typings/ng2.d.ts" />

import {Component, View, Directive, ElementRef} from 'angular2/angular2';

// Simple example directive
@Directive({
  selector: '[x-large]' // using [ ] means selecting attributes
})
class XLarge {
  constructor(public el: ElementRef) {
    // simple dom manipulation to set font size to x-large
    this.el.domElement.style.fontSize = 'x-large';
  }
}

// Top Level Component
@Component({
  selector: 'app' // without [ ] means we are selecting the tag directly
})
@View({
  directives: [ XLarge ], // needed in order to tell Angular's compiler what's in the template
  template: `
  <h1>Hello {{ name }}</h1>
  <span x-large>Extra Large Font Directive</span>
  `
})
export class App {
  name: string;
  constructor() {
    this.name = 'Angular 2';
  }
}
