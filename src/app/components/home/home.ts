/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../custom_typings/ng2.d.ts" />
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


@Component({
  selector: 'home'
})
@View({
  directives: [ XLarge ],
  template: require('./home.html') // using webpack require
})
export class Home {
  constructor() {

  }
}
