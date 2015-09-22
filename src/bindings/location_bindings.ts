/// <reference path="../typings/_custom.d.ts" />
import {bind} from 'angular2/angular2';
import {
  LocationStrategy,
  HashLocationStrategy,
  PathLocationStrategy
} from 'angular2/router';

export const PATH_LOCATION_BINDINGS = [
  bind(LocationStrategy).toClass(PathLocationStrategy)
];

export const HASH_LOCATION_BINDINGS = [
  bind(LocationStrategy).toClass(HashLocationStrategy)
];
