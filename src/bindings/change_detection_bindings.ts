/// <reference path="../typings/_custom.d.ts" />
import {bind} from 'angular2/angular2';
import {
  ChangeDetection,
  DynamicChangeDetection,
  JitChangeDetection,
  PreGeneratedChangeDetection
} from 'angular2/change_detection';

export var JIT_CHANGEDETECTION_BINDINGS = [
  bind(ChangeDetection).toClass(JitChangeDetection)
];

export var DYNAMIC_CHANGEDETECTION_BINDINGS = [
  bind(ChangeDetection).toClass(DynamicChangeDetection)
];

export var PREGENERATED_CHANGEDETECTION_BINDINGS = [
  bind(ChangeDetection).toClass(PreGeneratedChangeDetection)
];

export var BEST_CHANGEDETECTION_BINDINGS = [
  PreGeneratedChangeDetection.isSupported() ? PREGENERATED_CHANGEDETECTION_BINDINGS :
  JitChangeDetection.isSupported() ? JIT_CHANGEDETECTION_BINDINGS : DYNAMIC_CHANGEDETECTION_BINDINGS
];
