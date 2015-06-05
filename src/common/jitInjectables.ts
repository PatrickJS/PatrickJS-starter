/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../custom_typings/ng2.d.ts" />
import {ChangeDetection, JitChangeDetection} from 'angular2/change_detection';
import {bind} from 'angular2/di';

export var jitInjectables = [
  bind(ChangeDetection).toClass(JitChangeDetection)
];
