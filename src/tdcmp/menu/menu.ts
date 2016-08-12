import {Component, ViewEncapsulation, ElementRef, Input, Output, EventEmitter
  , HostListener, ContentChildren, AfterViewInit, OnDestroy, QueryList
  , ContentChild, Renderer} from '@angular/core';


  @Component({
    selector: 'td-menu-item',
    template: '<span class="item" (click)=test()><span><ng-content></ng-content></span></span>',
    styles: [require('./menu.scss')],
    encapsulation: ViewEncapsulation.None
  })
export class TDMenuItem {
  public menu: TDMenu;
  constructor (private elementRef: ElementRef) {}

  test() {
    let s = (<HTMLElement>this.elementRef.nativeElement).firstChild.firstChild.firstChild.nodeValue;
    this.menu.menuSelected.emit(s);
  }
}

@Component({
  selector: 'td-menu',
  template: require('./menu.html'),
  styles: [require('./menu.scss')],
  directives: [TDMenuItem],
  encapsulation: ViewEncapsulation.None
})
export class TDMenu implements AfterViewInit, OnDestroy {
@Output() menuSelected: EventEmitter<string> = new EventEmitter<string>();
@ContentChildren(TDMenuItem) items: QueryList<TDMenuItem>;

private active: boolean = false;
private _justClicked: boolean = false;
private _overlay: Element;
private _popupElement: Element;
private _triggerElement: Element;
private upper: boolean;
private top: string;
private left: string;

@HostListener('body:click', ['$event'])
closePopup() {
  if (!this.active) return;
  if (this._justClicked) {
    this._justClicked = false;
    return;
  }
  this.active = false;
}

constructor(private _element: ElementRef, private _renderer: Renderer) {}

ngAfterViewInit() {
  this.items.forEach(p => p.menu = this);
  this._overlay = document.getElementsByClassName('md-overlay-container')[0];
  this._popupElement = this._element.nativeElement.getElementsByClassName('tdpopup')[0];
  this._triggerElement = (<HTMLElement>this._element.nativeElement).firstElementChild;
  this._overlay.appendChild(this._popupElement);
}

togglePopup() {
  this._justClicked = true;
  this.active = !this.active;
  if (this.active) this.setPosition();
}

setPosition() {
  let rec = this._triggerElement.getBoundingClientRect();

  let height: number = 10.0;
  if (this.items) height = (this.items.length * 16.0);
  if (height > 500) height = 500;
  let wh = window.innerHeight;
  this.left = rec.left - 10 + 'px';

  if (rec.bottom - 40 + height < wh) {
    this.top = rec.bottom - 40 + 'px';
    this.upper = false;
    return;
  }

   if (rec.top - height + 40  > 0 ) {
     this.top = rec.top  - height + 40 + 'px';
     this.upper = true;
    return;
  }

  this.upper = false;
  this.top = '30px';
  this.left = '50%';

}

ngOnDestroy() {
    this._overlay.removeChild(this._popupElement);
}

}

export const MD_TDMENU_DIRECTIVES: any[] = [TDMenu, TDMenuItem];
