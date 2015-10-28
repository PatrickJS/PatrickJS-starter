/// <reference path="../../typings/_custom.d.ts" />

import {Injectable} from 'angular2/angular2';
import {Http} from 'angular2/http';
import * as Rx from '@reactivex/rxjs';


@Injectable()
export class ExampleService {
  constructor(public http: Http) {

  }
}

export const EXAMPLE_SERVICE_BINDINGS = [
  ExampleService
];
