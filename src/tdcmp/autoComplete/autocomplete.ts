import { Component, ViewEncapsulation, Input, Output, HostListener, ViewChild
  , EventEmitter, AfterViewInit, forwardRef, ElementRef, ViewContainerRef } from '@angular/core';
  import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    NgModel
  } from '@angular/forms';
  import {
    Overlay,
    OverlayOrigin,
    OverlayState,
    OverlayRef,
    OVERLAY_PROVIDERS,
    TemplatePortal,
    TemplatePortalDirective,
    PORTAL_DIRECTIVES,
    Portal,
    OVERLAY_DIRECTIVES
} from '@angular2-material/core/core';
import {
    ConnectedPositionStrategy
} from '@angular2-material/core/overlay/position/connected-position-strategy';

  export const MD_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
     provide: NG_VALUE_ACCESSOR,
     useExisting: forwardRef(() => MdAutoComplete),
     multi: true
   };
   const noop = () => {};

@Component({
  selector: 'md-autocomplete',
  template: require('./autocomplete.html'),
  styles: [require('./autocomplete.scss')],
  directives: [PORTAL_DIRECTIVES, OVERLAY_DIRECTIVES],
  providers: [MD_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR, OVERLAY_PROVIDERS],
  encapsulation: ViewEncapsulation.None
})
export class MdAutoComplete {
  @Input() items: Array<string>;
  @Input() get text(): string {
    return this._text;
  }
  set text(value: string) {
    if (this.text === value) return;
    this._text = value;
    this._onChangeCallback(value);
  }

  @Output() onPopupOpen = new EventEmitter();
  @Output() onPopupClose = new EventEmitter();
  @ViewChild(TemplatePortalDirective) templatePortal: Portal<any>;
  @ViewChild(OverlayOrigin) _overlayOrigin: OverlayOrigin;

  popupOpen: boolean = false;
  private _text: string;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private _active: boolean = false;
  private _overlayRef: OverlayRef;

  constructor(private _overlay: Overlay, private _element: ElementRef,
              private _viewContainerRef: ViewContainerRef) {}


  ngAfterViewInit() {
    console.log(this.templatePortal);
    setTimeout(() => this._active = true, 200);
  }

    ngOnDestroy() { this.destroyPopup(); }

  @HostListener('click')
  togglepopup(): Promise<void> {
    return this.popupOpen ? this.closePopup() : this.openPopup();
  }


  openPopup(): Promise<void> {
    return this._createOverlay()
      .then(() => this._overlayRef.attach(this.templatePortal))
      .then(() => this._setIsPopupOpen(true));
  }

  closePopup(): Promise<void> {
    if (!this._overlayRef) { return Promise.resolve(); }

   return this._overlayRef.detach()
       .then(() => this._setIsPopupOpen(false));
  }

  destroyPopup(): void {
  this._overlayRef.dispose();
}

  writeValue(value: any) {
      this.text = value;
  }

  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  private _setIsPopupOpen(isOpen: boolean): void {
     this.popupOpen = isOpen;
     // this.menu._setClickCatcher(isOpen);
     this.popupOpen ? this.onPopupOpen.emit(undefined) : this.onPopupClose.emit(undefined);
   }

  private _createOverlay(): Promise<any> {
     if (this._overlayRef) { return Promise.resolve(); }
     return this._overlay.create(this._getOverlayConfig())
         .then(overlay => this._overlayRef = overlay);
   }


   private _getOverlayConfig(): OverlayState {
     const overlayState = new OverlayState();
     overlayState.positionStrategy = this._getPosition();
     return overlayState;
   }

   private _getPosition(): any  {

  let rect = this._overlayOrigin.elementRef.nativeElement.getBoundingClientRect();
console.log(rect);

  // return this._overlay.position().global()
  //   .left(rect.left + 'px')
  //   .top(rect.bottom + 'px');

   return this._overlay.position().connectedTo(
     this._overlayOrigin.elementRef,
     {originX: 'start', originY: 'top'},
     {overlayX: 'start', overlayY: 'top'}
   );
 }




}

export const MD_AUTOCOMLETE_DIRECTIVES: any[] = [MdAutoComplete];
