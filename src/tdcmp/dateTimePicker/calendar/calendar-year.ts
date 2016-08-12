import {Component, ViewEncapsulation, ChangeDetectionStrategy
  , ViewChild, Input, Output, EventEmitter,  AfterViewInit
, ElementRef, Renderer  } from '@angular/core';
import { DateUtils } from '../../tools/dateUtils';

@Component({
  selector: 'md-calendar-year',
  template: require('./calendar-year.html'),
  styles: [require('./calendar-year.scss')],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdCalendarYear implements AfterViewInit {
  @Input()
  get date(): Date {
    return this._date;
  }
  set date(value: Date) {
    this._date = value;
    if (this._year === 0) {
      this.year = value.getFullYear();
      for (let y = this.year - 30; y <= this.year + 30; y++) {
        this.years.push(y);
      }
    } else {
      this.dateChanged.emit(this.date);
    }

  }

  @Output()
  dateChanged: EventEmitter<Date> = new  EventEmitter<Date>();


    get year(): number {
      return this._year;
    }
    set year(value: number) {
        this._year = value;
        this.years = [];
        for (let y = this._year - 30; y <= this._year + 30; y++) {
          this.years.push(y);
        }
        this.scrollToYear();
        this.date = new Date(value, this.date.getMonth(), this.date.getDate());
    }


    years: Array<number> = [];

    private _date: Date;
    private _year: number = 0;
    private _root: Element;


    constructor(private _element: ElementRef, private _renderer: Renderer) {
      this._root = _element.nativeElement;
    }

    ngAfterViewInit() {
        this.scrollToYear();
}


    scrollToYear() {

      let yb = this._root.getElementsByClassName('yearborder')[0];
      let index = this.years.indexOf(this._year);
      yb.scrollTop = 33 * index + 39;
    }
}
