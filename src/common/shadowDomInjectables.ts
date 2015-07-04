/// <reference path="../../typings/tsd.d.ts" />
import {
  ShadowDomStrategy,
  NativeShadowDomStrategy,
  EmulatedScopedShadowDomStrategy,
  EmulatedUnscopedShadowDomStrategy
} from 'angular2/render';
import {bind} from 'angular2/di';
import {document} from 'angular2/src/facade/browser';

export function hasNativeShadowDom() {
  return Boolean(document && document.body && document.body.createShadowRoot);
}

export var nativeShadowDomInjectables = !hasNativeShadowDom() ? [] : [
  bind(ShadowDomStrategy).toClass(NativeShadowDomStrategy)
];

export var emulatedScopedShadowDomInjectables = [
  bind(ShadowDomStrategy).toClass(EmulatedScopedShadowDomStrategy)
];

export var emulatedUnscopedShadowDomInjectables = [
  bind(ShadowDomStrategy).toClass(EmulatedUnscopedShadowDomStrategy)
];
