/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../custom_typings/ng2.d.ts" />
import {Component, View} from 'angular2/angular2';


@Component({
  selector: 'dashboard'
})
@View({
  template: `
  <div>
    Dashboard
  </div>
  `
})
export class Dashboard {
  constructor() {

  }
}
