import {Component, ViewEncapsulation, Input, Output, EventEmitter
  , AfterContentInit} from '@angular/core';

@Component({
  selector: 'td-searchbox',
  inputs: ['text', 'width'],
  template: require('./searchbox.html'),
  styles: [require('./searchbox.scss')],
  directives: []



})
export class TDSearchBox implements  AfterContentInit {

  @Output()
  textChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() placeholder: string = 'Search';

  get text(): string { return this._text; }
  @Input() set text(value: string) {
    if (value !== this._text) {
      this._text = value;
      if (this._initialized)
        this.textChange.emit(value);
   }

  }

private _alreadyChanged: boolean = false;
private _text: string = '';
private _initialized: boolean = false;

ngAfterContentInit() {
  this._initialized = true;
}
  clearText() {
    this.text = '';
  }
}
