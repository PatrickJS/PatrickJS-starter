import { Component, ViewEncapsulation, Input, Output, HostListener, ViewChild
  , EventEmitter, AfterViewInit, forwardRef, ElementRef, ViewContainerRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel } from '@angular/forms';
import { ICalendarDetail } from '../../app/Interfaces';
import { MD_DIALOG_DIRECTIVES, TdComboBox }
  from '../../tdcmp';


export const TD_TDCALENDAR_CONTROL_VALUE_ACCESSOR: any = {
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => TdCalendar),
   multi: true
 };
 const noop = () => {};

@Component({
  selector: 'td-calendar',
  template: require('./calendar.html'),
  styles: [require('./calendar.scss')],
  directives: [ MD_DIALOG_DIRECTIVES, TdComboBox],
  providers: [TD_TDCALENDAR_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class TdCalendar {
  @Output() onChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() weekEnds: boolean[];
  @Input() calendarId: number[];
  @Input() get items(): any[]{
    return this._items;
  }
  set items(value: any[]) {
    this._items = value;
    this._onChangeCallback(value);
  }
  @Input() get yearSelected(): number{
    return this._yearSelected;
  }
  set yearSelected(value: number) {
    if (this._yearSelected === value) return;
    this._yearSelected = value;
    this.moveYear();
  }

  days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  monthsValue: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
  'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  monthsNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  dayOfWeeks: number[] = [1, 2, 3, 4, 5, 6, 7];
  weeks: number[] = [];

  dateSelected: Date = undefined;
  displayAddDayOff: boolean = false;
  dayOffExist: boolean = false;
  dateNewdayOffName: string = undefined;

  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private _yearSelected: number;
  private _items: any[];
  private _displayAddDayOff: boolean;


  constructor() {
    this.weekEnds = [false, false, false, false, false, true, true];
    let currentDate = new Date();
    this.yearSelected = currentDate.getFullYear();
    this.moveYear();
   }

   writeValue(value: any) {
        this.items = value;
   }

   registerOnChange(fn: any) {
     this._onChangeCallback = fn;
   }

   registerOnTouched(fn: any) {
     this._onTouchedCallback = fn;
   }

   private isFirstDay (y, w, d): boolean {
     let dte = this.getDate(y, w, d);
     if (dte.getDate() === 1) {
       return true;
     }
      return false;
   }

   private isFirstWeek (y, w, d): boolean {
     let dte = this.getDate(y, w, d);
     let dteFirstday = new Date(dte.getFullYear(), dte.getMonth(), 1);
     if (this.getWeek(dte) === this.getWeek(dteFirstday)) {
       return true;
     }
      return false;
   }

   private isLastWeek (y, w, d): boolean {
     let dte = this.getDate(y, w, d);
     let dteLastDay = new Date(dte.getFullYear(), dte.getMonth() + 1 , 0);
     if (w !== this.weeks[this.weeks.length - 1] &&  this.isFirstWeek(y, w + 1, d)) {
       return false;
     }
     if (w === 1 && !this.isFirstWeek(y, w + 1, d) ) {
       if (this.getWeek(dte) === (this.getWeek(dteLastDay))) {
         return true;
       }
     }
     if (this.getWeek(dte) === (this.getWeek(dteLastDay))) {
       return true;
     }
      return false;
   }

   private getNbWeekOfMonth(y, m): number {
     let day = 1;
     m -= 1;
     let counter = 0;
     let date = new Date(y, m, day);
     while (date.getMonth() === m) {
       if (date.getDay() === 1) {
           counter += 1;
       }
     day += 1;
     date = new Date(y, m, day);
     }
     if (m === 0 && new Date( this.yearSelected, 0 , 1).getDay() !== 1) {
       counter += 1;
     }
   return counter;
   }

   private dayNotInYear (y, w, d): boolean {
     let dte = this.getDate(y, w, d);
     if (dte.getFullYear() === this._yearSelected) {
         return false;
     }
     return true;
   }

   private dayIsWeekEnd (y, w, d): boolean {
     let dte = this.getDate(y, w, d);
     let day = dte.getDay();
     if (day === 0 ) {
        day = 6;
     }else  {
       day = day - 1;
     }

     return this.weekEnds[day];
   }

   private getDate (y, w, d): Date {
     let dteStart = new Date(y, 0, 1);
     let dayStart = dteStart.getDay();
     if (dayStart === 0 ) {
        dayStart = 6;
     }else  {
       dayStart = dayStart - 1;
     }

     let nbDay = (7 * (w - 1)) + d - dayStart;
     dteStart.setDate(nbDay);
     return dteStart;
   }

   private getWeek(dte): number {
     let date = new Date(dte.getTime());
     date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    let week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
   }

   private moveYear() {
     this.weeks = [];
     for (let _w = 1; _w <= 52; _w++) {
       this.weeks.push(_w);
     }

     let decalage = new Date( this._yearSelected, 0 , 1).getDay();
     let decalageEnd = new Date(  this._yearSelected + 1, 0 , 0).getDay();
     if (decalage === 0 ) {
       decalage = 6;
     }else {
       decalage = decalage - 1;
     }
     if (decalageEnd === 0 ) {
       decalageEnd = 6;
     }
     let nbDayInYear = this.isLeapYear(this._yearSelected) ? 364 : 365;
     let nbEntireWeek = (7 - decalageEnd + decalage + nbDayInYear)  / 7;
     let moreWeek = (7 - decalageEnd + decalage + nbDayInYear)  % 7 > 0;
     if (nbEntireWeek > 52 ) {
       this.weeks.push(53);
       if (nbEntireWeek > 53 && moreWeek) {
         this.weeks.push(54);
       }
     };
   }

   private isLeapYear(y: number): boolean {
      return !(y % 4) && ((y % 100) > 0) || !((y % 400) === 0);
   }

   private displayDialogAdd(elm) {
     this.dateNewdayOffName = undefined;
     let dte = new Date(elm.srcElement.id);
     let day = dte.getDay();
     if (day === 0 ) {
       day = 6;
     }else {
       day = day - 1;
     }
     if (dte.getFullYear() === this.yearSelected && this.weekEnds[day] === false) {
       this.dayOffExist = false;

         let dto = this.findDatetoDTO(dte);
         if (dto !== undefined) {
             this.dayOffExist = true;
             this.dateNewdayOffName = dto.holidayName;
          }
       this.dateSelected = dte;
       this.displayAddDayOff = true;
     }
   }

   private confirmAddDayOff() {
    this.items.push( {
        id: 0,
        calendarId : this.calendarId,
        date: this.dateSelected,
        type: 0,
        holidayName: this.dateNewdayOffName
      });
     this.displayAddDayOff = false;
     this.onChange.emit(true);
   }

   private deleteDayOff() {
      let dto = this.findDatetoDTO(this.dateSelected);
      let index = this.items.indexOf(dto);
      this.items.splice(index, 1);
      this.displayAddDayOff = false;
      this.onChange.emit(true);
   }

   private findDatetoDTO(date): any {
       let obj = undefined;
       this.items.forEach(element => {
         let dteH = new Date(element.date);
         let dteCmp = new Date(dteH.getFullYear(), dteH.getMonth(), dteH.getDate());
         if (dteCmp.getTime() === date.getTime())
           obj = element;
       });
       return obj;
     }

   private isHoliday(y, w, d): boolean {
     if (this.items === undefined ||  this.items === [] || this.items.length === 0) {
      return false;
     }
     if (this.dayIsWeekEnd(y, w, d)) {
         return false;
     }
     if (this.dayNotInYear(y, w, d)) {
         return false;
     }
    let dte = this.getDate(y, w, d);
    for (let _e = 0; _e < this.items.length; _e++) {
      let dteH = new Date(this.items[_e].date);
      let dteCmp = new Date(dteH.getFullYear(), dteH.getMonth(), dteH.getDate());
      if (dteCmp.getTime() === dte.getTime()) {
        return true;
      }
    }
    return false;
   }

   private isHolidayName(y, w, d): string {
     if (this.items === undefined ||  this.items === [] || this.items.length === 0)
      return undefined;
     let dte = this.getDate(y, w, d);
     for (let _e = 0; _e < this.items.length; _e++) {
       let dteH = new Date(this.items[_e].date);
       let dteCmp = new Date(dteH.getFullYear(), dteH.getMonth(), dteH.getDate());
       if (dteCmp.getTime() === dte.getTime()) {
         return this.items[_e].holidayName;
       }
     }
    return undefined;
   }
}
export const MD_CALENDAR_DIRECTIVES: any[] = [ TdCalendar ];
