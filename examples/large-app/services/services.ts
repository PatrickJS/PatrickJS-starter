/// <reference path="../../typings/_custom.d.ts" />

import {bind} from 'angular2/angular2';
import {EXAMPLE_SERVICE_BINDINGS} from './example-service';


export * from './example-service';
// Include bindings that you want to have globally throughout our app
export var APP_SERVICES_BINDINGS: Array<any> = [
  EXAMPLE_SERVICE_BINDINGS
];
