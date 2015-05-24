/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../custom_typings/ng2.d.ts" />
import {ShadowDomStrategy, NativeShadowDomStrategy} from 'angular2/core';
import {StyleUrlResolver} from 'angular2/src/render/dom/shadow_dom/style_url_resolver';
import {bind} from 'angular2/di';
import {document} from 'angular2/src/facade/browser';

export var hasShadowDom = Boolean(document && document.body && document.body.createShadowRoot);

export var shadowDomInjectables = [
  (!hasShadowDom) ? [] :
  bind(ShadowDomStrategy).toFactory(
    styleUrlResolver => new NativeShadowDomStrategy(styleUrlResolver),
    [StyleUrlResolver]
  )
]
