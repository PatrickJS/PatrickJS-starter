import {Component, ViewEncapsulation, ChangeDetectionStrategy
  , ViewChild, Input, Output, EventEmitter, AfterViewInit  } from '@angular/core';
import { MdCalendarContent } from './calendar-content';
import { MdCalendarYear } from './calendar-year';
import { DateUtils } from '../../tools/dateUtils';

@Component({
  selector: 'md-calendar',
  template: require('./calendar.html'),
  styles: [require('./calendar.scss')],
  directives: [MdCalendarContent, MdCalendarYear],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default

})
export class MdCalendar implements AfterViewInit {
  @Input() active: boolean;
  @Input()
  get date(): Date {
    return this._date;
  }
  set date(value: Date) {
    if (!value) this._date = new Date(); else this._date = value;
    this.displayDate = this._date;
  }

  @Output()
  dateChange: EventEmitter<Date> = new EventEmitter<Date>();

  displayDate: Date = undefined;
  showYears: boolean = false;
  fullpage: boolean = false;
  @Input() upper: boolean = false;

  private _date: Date = undefined;
  private _initDate: Date;
  constructor() { }

  ngAfterViewInit() {
    this._initDate = this._date;
  }


  selectDate() {
    this._initDate = this._date;
    this.dateChange.emit(this.date);
  }

  abort() {
    this.date = this._initDate;
    this.dateChange.emit(undefined);
  }

  resetDate() {
    this.date = this._initDate;
  }
}


export const MD_CALENDAR_DIRECTIVES: any[] = [MdCalendar];
