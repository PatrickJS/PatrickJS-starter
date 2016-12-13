import { Component } from '@angular/core';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Tables` component loaded asynchronously');

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'tables',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './tables.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './tables.component.html'
})

export class TablesComponent {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `tables` component');
  }

}
