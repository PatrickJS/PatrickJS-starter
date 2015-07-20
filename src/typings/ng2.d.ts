declare var zone: any;
declare var Zone: any;

declare module "angular2/test" {
  class TestComponentBuilder {}
  class AsyncTestCompleter {}
  class DebugElement {}
  class By {}
  function inject(args: any): any;
  var browser: any;
  var $: any;
  function clickAll(buttonSelectors: any): void;
  function verifyNoBrowserErrors(): void;
}

declare module "angular2/src/core/life_cycle/life_cycle" {
  class LifeCycle {
    constructor(...args)
    tick(): any;
  }
}

declare module "angular2/src/render/dom/compiler/view_loader" {
  class ViewLoader {}
}

declare module "angular2/src/render/dom/compiler/style_url_resolver" {
  class StyleUrlResolver {}
}

declare module "angular2/src/render/dom/compiler/style_inliner" {
  class StyleInliner {}
}

declare module "angular2/src/core/compiler/view_resolver" {
  class ViewResolver {
    resolve(appComponent: any): any
  }
}

declare module "angular2/src/services/app_root_url" {
  class AppRootUrl {}
}

declare module "angular2/src/http/backends/browser_xhr" {
  class BrowserXHR {}
}

declare module "angular2/src/core/compiler/view_listener" {
  class AppViewListener {}
}

declare module "angular2/src/render/dom/compiler/template_loader" {
 class TemplateLoader {

 }
}

declare module "angular2/src/core/compiler/template_resolver" {
  class TemplateResolver {

  }
}

declare module "angular2/src/render/xhr_impl" {
  class XHRImpl {}
}

declare module "angular2/src/services/xhr_impl" {
  class XHRImpl {

  }
}

declare module "angular2/src/render/dom/events/key_events" {
  class KeyEventsPlugin {
    static getEventFullKey: any
    getEventFullKey: any
  }
}
declare module "angular2/src/render/dom/events/hammer_gestures" {
  class HammerGesturesPlugin {

  }
}
declare module "angular2/src/core/compiler/component_url_mapper" {
  class ComponentUrlMapper {

  }
}
declare module "angular2/src/services/url_resolver" {
  class UrlResolver {

  }

}
declare module "angular2/src/render/dom/shadow_dom/style_inliner" {
  class StyleInliner{}

}
declare module "angular2/src/core/compiler/dynamic_component_loader" {
  class ComponentRef {
    constructor(newLocation: any, component: any, dispose: any)
    location: any
    instance: any
    dispose: any
  }
  class DynamicComponentLoader {
    loadAsRoot(appComponentType: any, bindings: any, injector: any): any
  }
}
declare module "angular2/src/core/testability/testability" {
  class TestabilityRegistry {

  }
  class Testability {

  }
}
declare module "angular2/src/core/compiler/view_pool" {
  class AppViewPool {

  }
  var APP_VIEW_POOL_CAPACITY: any
}
declare module "angular2/src/core/compiler/view_manager" {
  class AppViewManager {

  }

}
declare module "angular2/src/core/compiler/view_manager_utils" {
  class AppViewManagerUtils {

  }
}
declare module "angular2/src/core/compiler/proto_view_factory" {
  class ProtoViewFactory {

  }
}
declare module "angular2/src/render/dom/compiler/compiler" {
  class DefaultDomCompiler {

  }
}
declare module "angular2/src/core/compiler/view_ref" {
  var internalView:any
}

declare module "angular2/src/reflection/reflection" {
 var reflector:any
 class Reflector {

 }
}
declare module "angular2/src/reflection/reflection_capabilities" {
  class ReflectionCapabilities {

  }
}

declare module "angular2/src/render/dom/view/proto_view" {
  class DomProtoView {
    rootBindingOffset: any;
    element: any;
    isTemplateElement(): any
    elementBinders(): any
  }

}

declare module "angular2/src/render/dom/view/view_container" {
  class DomViewContainer{}
}

declare module "angular2/src/render/dom/util" {
  var NG_BINDING_CLASS_SELECTOR: any;
  var NG_BINDING_CLASS: any ;
}


declare module "angular2/src/render/dom/dom_renderer" {
  class DomRenderer {
    _moveViewNodesIntoParent(): any
    _createGlobalEventListener(): any
    _createEventListener(): any
  }
  var DOCUMENT_TOKEN: any;
}

declare module "angular2/src/render/api" {
  class RenderCompiler {

  }
  class Renderer {

  }
  class RenderViewRef {

  }
  class RenderProtoViewRef {

  }

}
declare module "angular2/src/render/dom/shadow_dom/content_tag" {
  function Content(element: any, contentTagSelector:any): void;
}
declare module "angular2/src/render/dom/view/view" {
  class DomViewRef {

  }
  class DomView {
    viewContainers(): any
  }
  function resolveInternalDomView(viewRef: any): any;
}
declare module "angular2/src/render/dom/shadow_dom/shadow_dom_strategy" {
  class ShadowDomStrategy {
    prepareShadowRoot(element: any): any
    constructLightDom(lightDomView: any, el: any): any
  }
}

declare module "angular2/src/render/dom/events/event_manager" {
  class EventManager {
    constructor(...args)
    addEventListener(element: any, eventName: string, handler: Function): any
    addGlobalEventListener(target: string, eventName: string, handler: Function): any
  }
  class DomEventsPlugin {

  }
}

declare module "zone.js" {
  var zone: any;
  var Zone: any;
}

declare module "rtts_assert/rtts_assert" {
  var assert: any;
}

declare module "angular2/directives" {
  class NgSwitch {}
  class NgSwitchWhen {}
  class NgSwitchDefault {}
  class NgNonBindable {}
  class NgIf {}
  class NgFor {}
  class CSSClass {}

  var formDirectives: any;
  var coreDirectives: any;

}

declare module "angular2/src/change_detection/pipes/pipe" {
  class PipeFactory {
  }
}

declare module "angular2/src/change_detection/change_detection" {
  var async: any;
}

declare module "angular2/pipes" {
  class ObservablePipe {
    constructor(ref: any)
    _subscription: any;
    _observable: any;
    _updateLatestValue(value: any): any;
    _subscribe(obs: any): any;
  }
}

declare module "angular2/change_detection" {
  interface PipeFactory {}
  interface Pipe {}
  class Pipes {
    static append(pipes: any)
  }
  class BasePipe implements Pipe {}
  class NullPipeFactory {}
  class PipeRegistry {
    constructor(pipes: any)
  }
  class WrappedValue {
    static wrap(...args): any
  }
  class ChangeDetectorRef {
    requestCheck(): void;
  }
  var defaultPipeRegistry: any;
  var defaultPipes: any;
  class Parser {

  }
  class Lexer {

  }
  class ChangeDetection {

  }
  class DynamicChangeDetection {

  }
  class PreGeneratedChangeDetection {
    static isSupported(): boolean;
  }
  class JitChangeDetection {
    static isSupported(): boolean;
  }
}

declare module "angular2/src/core/zone/ng_zone" {
  class NgZone {
    constructor(config: any)
    initCallbacks(config: any): any
    runOutsideAngular(context: any): any;
    run(context: any): any
  }
}


declare module "angular2/src/core/compiler/element_ref" {
  class ElementRef {
    constructor(host: any, location?: any)
    nativeElement: any;
  }
}

declare module "angular2/src/core/exception_handler" {
  class ExceptionHandler {

  }
}

declare module "angular2/src/render/xhr" {
  class XHR {

  }
}

declare module "angular2/src/core/application_tokens" {
  var appComponentRefToken: any;
  var appComponentTypeToken: any;
}

declare module "angular2/src/core/compiler/compiler" {
  class Compiler {

  }
  class CompilerCache {

  }
}

declare module "angular2/forms" {
  class Validators {
    static required(): any
  }
}

declare module "angular2/src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy" {
  class EmulatedUnscopedShadowDomStrategy {
    styleHost: any;
    constructor(styleHost: any);
    hasNativeContentElement(): boolean;
    prepareShadowRoot(el: any): any;
    constructLightDom(lightDomView: any, el: any): any;
    processStyleElement(hostComponentId: string, templateUrl: string, styleEl: any): void;

  }
}

declare module "angular2/render" {
  class ShadowDomStrategy {
    hasNativeContentElement(): boolean;
    prepareShadowRoot(el: any): any;
    constructLightDom(lightDomView: any, el: any): any;
    processStyleElement(hostComponentId: string, templateUrl: string, styleElement: any): void;
    processElement(hostComponentId: string, elementComponentId: string, element: any): void;
  }
  class NativeShadowDomStrategy extends ShadowDomStrategy {
    prepareShadowRoot(el: any): any;
  }
  class EmulatedUnscopedShadowDomStrategy extends ShadowDomStrategy {
    styleHost: any;
    constructor(styleHost: any);
    hasNativeContentElement(): boolean;
    prepareShadowRoot(el: any): any;
    constructLightDom(lightDomView: any, el: any): any;
    processStyleElement(hostComponentId: string, templateUrl: string, styleEl: any): void;

  }
  class EmulatedScopedShadowDomStrategy extends EmulatedUnscopedShadowDomStrategy {
    constructor(styleHost: any);
    processStyleElement(hostComponentId: string, templateUrl: string, styleEl: any): void;
    _moveToStyleHost(styleEl: any): void;
    processElement(hostComponentId: string, elementComponentId: string, element: any): void;

  }
  class Renderer {
/**
     * Creates a root host view that includes the given element.
     * @param {RenderProtoViewRef} hostProtoViewRef a RenderProtoViewRef of type
     * ProtoViewDto.HOST_VIEW_TYPE
     * @param {any} hostElementSelector css selector for the host element (will be queried against the
     * main document)
     * @return {RenderViewRef} the created view
     */
    createRootHostView(hostProtoViewRef: any, hostElementSelector: string): any;
    /**
     * Creates a regular view out of the given ProtoView
     */
    createView(protoViewRef: any): any;
    /**
     * Destroys the given view after it has been dehydrated and detached
     */
    destroyView(viewRef: any): void;
    /**
     * Attaches a componentView into the given hostView at the given element
     */
    attachComponentView(location: any, componentViewRef: any): void;
    /**
     * Detaches a componentView into the given hostView at the given element
     */
    detachComponentView(location: any, componentViewRef: any): void;
    /**
     * Attaches a view into a ViewContainer (in the given parentView at the given element) at the
     * given index.
     */
    attachViewInContainer(location: any, atIndex: number, viewRef: any): void;
    /**
     * Detaches a view into a ViewContainer (in the given parentView at the given element) at the
     * given index.
     */
    detachViewInContainer(location: any, atIndex: number, viewRef: any): void;
    /**
     * Hydrates a view after it has been attached. Hydration/dehydration is used for reusing views
     * inside of the view pool.
     */
    hydrateView(viewRef: any): void;
    /**
     * Dehydrates a view after it has been attached. Hydration/dehydration is used for reusing views
     * inside of the view pool.
     */
    dehydrateView(viewRef: any): void;
    /**
     * Returns the native element at the given location.
     * Attention: In a WebWorker scenario, this should always return null!
     */
    getNativeElementSync(location: any): any;
    /**
     * Sets a property on an element.
     */
    setElementProperty(location: any, propertyName: string, propertyValue: any): void;
    /**
     * Sets an attribute on an element.
     */
    setElementAttribute(location: any, attributeName: string, attributeValue: string): void;
    /**
     * Sets a class on an element.
     */
    setElementClass(location: any, className: string, isAdd: boolean): void;
    /**
     * Sets a style on an element.
     */
    setElementStyle(location: any, styleName: string, styleValue: string): void;
    /**
     * Calls a method on an element.
     */
    invokeElementMethod(location: any, methodName: string, args: List<any>): void;
    /**
     * Sets the value of a text node.
     */
    setText(viewRef: any, textNodeIndex: number, text: string): void;
    /**
     * Sets the dispatcher for all events of the given view
     */
    setEventDispatcher(viewRef: any, dispatcher: any): void;
  }
}

declare module "angular2/src/render/dom/shadow_dom/style_url_resolver" {
  class StyleUrlResolver {

  }
}

declare module "angular2/src/facade/async" {
  class ObservableWrapper {
    static callNext(next:any): any;
    static subscribe(observer:any): any;
  }
  class Promise {
    then(pro:any): any;
    all(all:any): any;
  }
  class PromiseWrapper {
    static completer(): any;
    static all(all: any): any;
    static then(pro:any, sucess?: any, failure?: any): any;
    static wrap(pro:any): any;
  }
}

declare module "angular2/src/facade/collection" {
  var List: Array<any>;
  var Map: any;
  var ListWrapper: any;
  var MapWrapper: any;
  var StringMapWrapper: any;
}

declare module "angular2/src/facade/browser" {
  var __esModule: boolean;
  var win: any;
  var window: any;
  var document: any;
  var location: any;
  var gc: () => void;
  var Event: any;
  var MouseEvent: any;
  var KeyboardEvent: any;
}

declare module "angular2/src/facade/lang" {
  var int: any;
  var Type: Function;
  var assertionsEnabled: any;
  function isPresent(bool: any): boolean;
  function isBlank(bool: any): boolean;
  function isString(bool: any): boolean;
  class BaseException {

  }
  class RegExpWrapper {

  }
  class NumberWrapper {

  }
  class StringWrapper {
    static toLowerCase(str: string): string;
    static toUpperCase(str: string): string;
  }
  function print(str: any):any;
  function stringify(str: any):any;
}

declare module "angular2/src/core/compiler/directive_resolver" {
  class DirectiveResolver {
    resolve(appComponent: any): any
  }
}

