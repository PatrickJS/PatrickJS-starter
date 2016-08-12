import { Component, Input, ViewEncapsulation, OnInit, ViewChild, ContentChild
, ElementRef, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'md-dialog',
  template: require('./dialog.html'),
  styles: [require('./dialog.scss')],
  encapsulation: ViewEncapsulation.None
})
export class MdDialog implements OnInit {

  @Output() close: EventEmitter<boolean> = new  EventEmitter<boolean>();

  active: boolean = false;

  constructor(private _element: ElementRef) {
  }

  ngOnInit() {
    let overlay = document.getElementsByClassName('md-overlay-container')[0];
    overlay.appendChild(this._element.nativeElement);
    setTimeout(() => { this.active = true; }, 10);
  }



  closeDialog() {
    this.close.emit(false);
  }

}

export const MD_DIALOG_DIRECTIVES: any[] = [MdDialog];
