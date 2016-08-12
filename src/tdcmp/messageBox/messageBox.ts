import {Component, ViewEncapsulation, ElementRef, Input, Output, EventEmitter
  , OnInit, ViewChild, OnDestroy} from '@angular/core';


@Component({
  selector: 'message-box',
  template: require('./messageBox.html'),
  styles: [require('./messageBox.scss')],
  encapsulation: ViewEncapsulation.None
})
export class MessageBox implements OnInit, OnDestroy {
  @Output() onClose: EventEmitter<boolean> = new  EventEmitter<boolean>();

  private active: boolean = false;
  private opened: boolean = false;


  private _overlay: Element;

  constructor(private _element: ElementRef) {}

  public Open() {
    this.opened = true;
    setTimeout(() => { this.active = true; }, 10);
  }

  ngOnInit() {
    this._overlay = document.getElementsByClassName('md-overlay-container')[0];
    this._overlay.appendChild(this._element.nativeElement);
  }

  closeDialog(value: boolean) {
    this.onClose.emit(value);
    this.active = false;
    setTimeout(() => this.opened = false, 200);
  }

  ngOnDestroy() {
    if (this._overlay) {
      this._overlay.removeChild(this._element.nativeElement);
    }
  }
}

export const MD_MESSAGEBOX_DIRECTIVES: any[] = [MessageBox];
