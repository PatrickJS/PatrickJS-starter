import {Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output,
  EventEmitter} from '@angular/core';
import { DateUtils } from '../../tools/dateUtils';

@Component({
  selector: 'md-calendar-content',
  template: require('./calendar-content.html'),
  styles: [require('./calendar-content.scss')],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdCalendarContent {

@Input()
get date(): Date {
  return this._date;
}
set date(value) {
  this._date = value;
  this._selectedDate = value;

}
@Output()
dateChanged: EventEmitter<Date> = new  EventEmitter<Date>();

@Input()
set displayDate(value: Date) {
  this._displayDate = value;
  let firstDayOfWeek = DateUtils.getFirstDayOfWeek();
  this.monthCalendar = DateUtils.getWeekArray(this._displayDate, firstDayOfWeek.getDay() + 1);
}


monthCalendar: Array<Array<Date>>;

private _date: Date;
private _displayDate: Date;
private _selectedDate: Date;

  constructor () {}


  changeDate(e: any, d: Date) {
    this._selectedDate = d;
    this.dateChanged.emit(d);
  }

  changeMonth(m) {
    this.displayDate = DateUtils.addMonths(this._displayDate, m);
  }

}
