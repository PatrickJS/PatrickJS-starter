import {Component, Input, EventEmitter, HostListener, HostBinding
  , ElementRef, OnInit, OnDestroy, Renderer } from '@angular/core';

@Component({
  selector: 'md-snackbar',
  template: require('./snackbar.html'),
  styles: [require('./snackbar.scss')],
  directives: []
})
export class MdSnackBar {
  opened: boolean = false;
  small: boolean = false;
  action: string = 'Ok';
  timeout: number = 5000;
  public error: boolean = false;
  timer: any;

@Input()
public get message(): string {return this._message; }
public set message(value: string) {
  this._message = value;
  if (value && value !== '') {

    if (this.opened) {
      clearTimeout(this.timer);
      this.opened = false;
      setTimeout(() => this.open(), 400);
    } else this.open();
  }
}

private _message: string = undefined;

open() {
  this.opened = true;
  this.timer = setTimeout(() => {
    this.opened = false;
    this.message = undefined;
  }, this.timeout);
}



  constructor() {}
}

export const MD_SNACKBAR_DIRECTIVES: any[] = [MdSnackBar];
