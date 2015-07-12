/// <reference path="../typings/_custom.d.ts" />
import {bind} from 'angular2/di';
import {
  LocationStrategy,
  HashLocationStrategy,
  HTML5LocationStrategy
} from 'angular2/router';

export var html5locationInjectables = [
  bind(LocationStrategy).toClass(HTML5LocationStrategy)
];

export var hashlocationInjectables = [
  bind(LocationStrategy).toClass(HashLocationStrategy)
];
