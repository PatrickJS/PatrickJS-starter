/// <reference path="../../typings/tsd.d.ts" />
import {bind} from 'angular2/di';
import {
  ChangeDetection,
  DynamicChangeDetection,
  JitChangeDetection,
  PreGeneratedChangeDetection
} from 'angular2/change_detection';

export var jitInjectables = [
  bind(ChangeDetection).toClass(JitChangeDetection)
];

export var dynamicInjectables = [
  bind(ChangeDetection).toClass(DynamicChangeDetection)
];

export var preGeneratedInjectables = [
  bind(ChangeDetection).toClass(PreGeneratedChangeDetection)
];
