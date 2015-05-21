/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../custom_typings/ng2.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';

// Example of using conventions
let componentName = 'home';
let styles   = getFile(componentName, 'css');  //=> home.css
let template = getFile(componentName, 'html'); //=> home.html

@Component({
  selector: componentName
})
@View({
  // include our .html and .css file
  template:`<style>${styles}</style>\n${template}`
})
export class Home {
  constructor() {

  }
}



function getFile(componentName: string, type: string): string {
  // Use webpack to get files as a string
  return require(`./${ componentName }.${type}`);
}
