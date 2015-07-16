/// <reference path="../typings/_custom.d.ts" />
import {
  ShadowDomStrategy,
  NativeShadowDomStrategy,
  EmulatedScopedShadowDomStrategy,
  EmulatedUnscopedShadowDomStrategy
} from 'angular2/render';
import {bind} from 'angular2/di';
import {document} from 'angular2/src/facade/browser';
import {DOCUMENT_TOKEN} from 'angular2/src/render/dom/dom_renderer';

export function hasNativeShadowDom() {
  return Boolean(document && document.body && document.body.createShadowRoot);
}

export var emulatedScopedShadowDomInjectables = [
  bind(ShadowDomStrategy).toFactory((doc) => {
    return new EmulatedScopedShadowDomStrategy(doc.body);
  }, [DOCUMENT_TOKEN])
];

// use EmulatedScope if Native is not supported
export var nativeShadowDomInjectables = hasNativeShadowDom() ? [
    bind(ShadowDomStrategy).toClass(NativeShadowDomStrategy)
  ] : emulatedScopedShadowDomInjectables;

export var emulatedUnscopedShadowDomInjectables = [
  bind(ShadowDomStrategy).toFactory((doc) => {
    return new EmulatedUnscopedShadowDomStrategy(doc.body);
  }, [DOCUMENT_TOKEN])
];
