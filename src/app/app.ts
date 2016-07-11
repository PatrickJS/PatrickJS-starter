import { Component } from '@angular/core';

import * as acAppModule from './ac-app';

@Component({
  selector: 'app',
  directives: [
    acAppModule.App
  ],
  template: `
    <div>Hello World</div>
    <app></app>
  `
})
export class App {

}
