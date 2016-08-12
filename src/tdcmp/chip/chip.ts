import { Component, ViewEncapsulation, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'md-chip',
  template: require('./chip.html'),
  styles: [require('./chip.scss')],
  encapsulation: ViewEncapsulation.None
})
export class MdChip {
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _active: boolean = false;

  ngAfterViewInit() {
    setTimeout(() => this._active = true, 200);
  }

}
