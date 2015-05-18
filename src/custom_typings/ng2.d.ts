declare module "angular2/router" {
  var Router: any;
  var RouterOutlet: any;
  var RouterLink: any;
  var RouteParams: any;
  var routerInjectables: any;
  var RouteConfigAnnotation: any;
  var RouteConfig: any;
}


declare module "angular2/src/dom/browser_adapter" {
    class BrowserDomAdapter {
        static makeCurrent(): void;
        logError(error: any): void;
        attrToPropMap: any;
        query(selector: string): any;
        querySelector(el: any, selector: string): Node;
        querySelectorAll(el: any, selector: string): List<any>;
        on(el: any, evt: any, listener: any): void;
        onAndCancel(el: any, evt: any, listener: any): Function;
        dispatchEvent(el: any, evt: any): void;
        createMouseEvent(eventType: string): MouseEvent;
        createEvent(eventType: any): Event;
        getInnerHTML(el: any): any;
        getOuterHTML(el: any): any;
        nodeName(node: Node): string;
        nodeValue(node: Node): string;
        type(node: HTMLInputElement): string;
        content(node: Node): Node;
        firstChild(el: any): Node;
        nextSibling(el: any): Node;
        parentElement(el: any): any;
        childNodes(el: any): List<Node>;
        childNodesAsList(el: any): List<any>;
        clearNodes(el: any): void;
        appendChild(el: any, node: any): void;
        removeChild(el: any, node: any): void;
        replaceChild(el: Node, newChild: any, oldChild: any): void;
        remove(el: any): any;
        insertBefore(el: any, node: any): void;
        insertAllBefore(el: any, nodes: any): void;
        insertAfter(el: any, node: any): void;
        setInnerHTML(el: any, value: any): void;
        getText(el: any): any;
        setText(el: any, value: string): void;
        getValue(el: any): any;
        setValue(el: any, value: string): void;
        getChecked(el: any): any;
        setChecked(el: any, value: boolean): void;
        createTemplate(html: any): HTMLElement;
        createElement(tagName: any, doc?: Document): HTMLElement;
        createTextNode(text: string, doc?: Document): Text;
        createScriptTag(attrName: string, attrValue: string, doc?: Document): HTMLScriptElement;
        createStyleElement(css: string, doc?: Document): HTMLStyleElement;
        createShadowRoot(el: HTMLElement): DocumentFragment;
        getShadowRoot(el: HTMLElement): DocumentFragment;
        getHost(el: HTMLElement): HTMLElement;
        clone(node: Node): Node;
        hasProperty(element: any, name: string): boolean;
        getElementsByClassName(element: any, name: string): any;
        getElementsByTagName(element: any, name: string): any;
        classList(element: any): List<any>;
        addClass(element: any, classname: string): void;
        removeClass(element: any, classname: string): void;
        hasClass(element: any, classname: string): any;
        setStyle(element: any, stylename: string, stylevalue: string): void;
        removeStyle(element: any, stylename: string): void;
        getStyle(element: any, stylename: string): any;
        tagName(element: any): string;
        attributeMap(element: any): any;
        hasAttribute(element: any, attribute: string): any;
        getAttribute(element: any, attribute: string): any;
        setAttribute(element: any, name: string, value: string): void;
        removeAttribute(element: any, attribute: string): any;
        templateAwareRoot(el: any): any;
        createHtmlDocument(): Document;
        defaultDoc(): Document;
        getBoundingClientRect(el: any): any;
        getTitle(): string;
        setTitle(newTitle: string): void;
        elementMatches(n: any, selector: string): boolean;
        isTemplateElement(el: any): boolean;
        isTextNode(node: Node): boolean;
        isCommentNode(node: Node): boolean;
        isElementNode(node: Node): boolean;
        hasShadowRoot(node: any): boolean;
        isShadowRoot(node: any): boolean;
        importIntoDoc(node: Node): Node;
        isPageRule(rule: any): boolean;
        isStyleRule(rule: any): boolean;
        isMediaRule(rule: any): boolean;
        isKeyframesRule(rule: any): boolean;
        getHref(el: Element): string;
        getEventKey(event: any): string;
        getGlobalEventTarget(target: string): EventTarget;
        getHistory(): History;
        getLocation(): Location;
        getBaseHref(): any;
    }
}

declare module "angular2/angular2" {
  function bootstrap(appComponentType: any, componentInjectableBindings?: Array<any>, errorReporter?: Function): Promise<ComponentRef>;

  class ElementRef {
    domElement: any;
  }

  function Switch(): void;
  function SwitchWhen(): void;
  function SwitchDefault(): void;
  function NonBindable(): void;
  function If(): void;
  function For(): void;

  var Observable: any;
  var EventEmitter: any;
  var DomRenderer: any;
  var DOCUMENT_TOKEN: any;
  var ASTWithSource: any;
  var AST: any;
  var AstTransformer: any;
  var AccessMember: any;
  var LiteralArray: any;
  var ImplicitReceiver: any;
  var Lexer: any;
  var Parser: any;
  var Locals: any;
  var ExpressionChangedAfterItHasBeenChecked: any;
  var ChangeDetectionError: any;
  var ProtoChangeDetector: any;
  var ChangeDispatcher: any;
  var ChangeDetector: any;
  var ChangeDetection: any;
  var CHECK_ONCE: any;
  var CHECK_ALWAYS: any;
  var DETACHED: any;
  var CHECKED: any;
  var ON_PUSH: any;
  var DEFAULT: any;
  var DynamicProtoChangeDetector: any;
  var JitProtoChangeDetector: any;
  var BindingRecord: any;
  var DirectiveIndex: any;
  var DirectiveRecord: any;
  var DynamicChangeDetector: any;
  var ChangeDetectorRef: any;
  var PipeRegistry: any;
  var uninitialized: any;
  var WrappedValue: any;
  var Pipe: any;
  var NullPipe: any;
  var NullPipeFactory: any;
  var defaultPipes: any;
  var DynamicChangeDetection: any;
  var JitChangeDetection: any;
  var defaultPipeRegistry: any;
  var ___esModule: any;
  var ViewRef: any;
  var ProtoViewRef: any;
  class ViewContainerRef {}
  var AncestorAnnotation: any;
  var ParentAnnotation: any;
  interface OnChange {}
  var ViewAnnotation: any;
  interface ApplicationRef {}
  var appComponentRefToken: any;
  var appComponentAnnotatedTypeToken: any;
  var QueryAnnotation: any;
  var AttributeAnnotation: any;
  interface QueryList {}
  interface CompilerCache {}
  interface Compiler {}
  interface TemplateLoader {}
  interface ShadowDomStrategy {}
  interface NativeShadowDomStrategy {}
  interface EmulatedScopedShadowDomStrategy {}
  interface EmulatedUnscopedShadowDomStrategy {}
  interface ComponentRef {
     instance: any;
     dispose(): void;
  }
  class DynamicComponentLoader {
     loadIntoNewLocation(type: any, b: any, c: any, d?: any): Promise<ComponentRef>;
     loadNextToExistingLocation(a: any, b: any, c: any): Promise<ComponentRef>;
  }
  var ComponentAnnotation: any;
  var DirectiveAnnotation: any;
  var onDestroy: any;
  var onChange: any;
  var onAllChangesDone: any;
  var Directive: any;
  var Ancestor: any;
  var Parent: any;
  var Attribute: any;
  var Query: any;
  var coreDirectives: any;
  interface CSSClass {}
  var VALID: any;
  var INVALID: any;
  interface Control {}
  interface ControlGroup {}
  interface ControlArray {}
  interface DefaultValueAccessor {}
  interface CheckboxControlValueAccessor {}
  interface ControlDirective {}
  interface ControlGroupDirective {}
  var formDirectives: any;
  interface Validators {}
  interface RequiredValidatorDirective {}
  interface FormBuilder {}
  interface EventBinding {}
  interface ElementBinder {}
  interface DirectiveBinder {}
  interface ProtoViewDto {}
  interface DirectiveMetadata {}
  interface RenderProtoViewRef {}
  interface RenderViewRef {}
  interface ViewDefinition {}
  interface RenderCompiler {}
  interface Renderer {}
  interface EventDispatcher {}
}

declare module "angular2/di" {

  function bind(token: any): any;
  class Injector {
     resolveAndCreateChild(bindings: [any]): Injector;
  }
  var Binding: any;
  var ResolvedBinding: any;
  var Dependency: any;
  var Key: any;
  var KeyRegistry: any;
  var TypeLiteral: any;
  var NoBindingError: any;
  var AbstractBindingError: any;
  var AsyncBindingError: any;
  var CyclicDependencyError: any;
  var InstantiationError: any;
  var InvalidBindingError: any;
  var NoAnnotationError: any;
  var OpaqueToken: any;
  var ___esModule: any;
  var InjectAnnotation: any;
  var InjectPromiseAnnotation: any;
  var InjectLazyAnnotation: any;
  var OptionalAnnotation: any;
  var InjectableAnnotation: any;
  var DependencyAnnotation: any;
  var Inject: any;
  var InjectPromise: any;
  var InjectLazy: any;
  var Optional: any;
  var Injectable: any;
}
