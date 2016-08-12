import {Component, Input, Output, EventEmitter, HostListener
  , ElementRef, Renderer, AfterContentInit, OnDestroy, ViewChild
  , forwardRef, Provider, ViewEncapsulation } from '@angular/core';
import { DateFormatter } from '@angular/common/src/facade/intl';
import { MdCalendar } from './calendar/calendar';
import {BooleanFieldValue} from '@angular2-material/core/annotations/field-value';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgModel
} from '@angular/forms';

export const MD_DATEPICKER_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => MDDateTimePicker),
  multi: true
});

const noop = () => {};

export class MdDateChange {
  source: MDDateTimePicker;
  oldDate: Date;
  newDate: Date;
}


@Component({
  selector: 'md-datetimepicker',
  template: require('./dateTimePicker.html'),
  styles: [require('./dateTimePicker.scss')],
  providers: [MD_DATEPICKER_CONTROL_VALUE_ACCESSOR],
  directives: [MdCalendar],
  encapsulation: ViewEncapsulation.None
})
export class MDDateTimePicker implements AfterContentInit, OnDestroy, ControlValueAccessor {
  @ViewChild(MdCalendar) calendar: MdCalendar;

  upper: boolean = false;

  @Input()
  get date(): Date {
    return this._date;
  }
  set date(value: Date) {
    this._date = value;
    if (value) {
      this._internalDate = DateFormatter.format(this._date, 'fr-FR', 'dd/MM/yyyy');
    } else this._internalDate = '';

  }

get CalendarDate(): Date
{
  return this._calendarDate;
}
set CalendarDate(value: Date) {
  let ev = new MdDateChange();
  ev.source = this;
  ev.oldDate = this._calendarDate;
  ev.newDate = value;
  this._calendarDate = value;
  this.change.emit(ev);
  this.date = value;
  this.dateChange.emit(value);
  this._onChangeCallback(value);
  if (this._internalDateChanged) {
    this._internalDateChanged = false;
    return;
  }
  this.displayCalendar = false;
  this.active = false;
}


  @Input() placeHolder: string;

  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() change: EventEmitter<MdDateChange> = new EventEmitter<MdDateChange>();
  @Input() @BooleanFieldValue() required: boolean = false;

  displayCalendar: boolean = false;

  get internalDate(): string {
    return this._internalDate;
  }
  set internalDate (value: string) {
    this._internalDate = value;
    this._internalDateChanged = true;
    if (!value) {
      this.CalendarDate = undefined;
      return;
    }
    let d: Date = this.checkDate(value);
    if (d) this.CalendarDate = d;
  }

  checkDate(v: string): Date {
    let a = v.split('/');
    if (a.length !== 3) return undefined;
    if (a[0].length !== 2 || a[1].length !== 2 || a[2].length !== 4) return undefined;

    let d = Date.parse(a[1] + '/' + a[0] + '/' + a[2]);
    if (isNaN(d) || d < 0) return undefined;
    return new Date(d);
  }

  @HostListener('body:click', ['$event'])
  closeMenu($event: MouseEvent) {
    if (!this.displayCalendar) return;
    if (this._justClicked) {
      this._justClicked = false;
      return;
    }
    if (!this.isInElement(this._calElement, $event.clientX, $event.clientY)) {
      this.calendar.resetDate();
      this.displayCalendar = false;
      this.active = false;
    }

  }

  @HostListener('window:resize', ['$event.target'])
  setCalendarPosition() {
    let rec = this._inputElement.getBoundingClientRect();
    let wh = window.innerHeight;


    if (rec.bottom + 3 + 410 < wh) {
      this._renderer.setElementStyle(this._calElement, 'top', rec.bottom + 3 + 'px');
      this._renderer.setElementStyle(this._calElement, 'left', rec.left + 'px');
      this.upper = false;
      return;
    }

     if (rec.bottom > 434 ) {
       this._renderer.setElementStyle(this._calElement, 'top', rec.bottom  - 490 + 'px');
       this._renderer.setElementStyle(this._calElement, 'left', rec.left + 'px');
       this.upper = true;
      return;
    }

    this.upper = false;
    this._renderer.setElementStyle(this._calElement, 'top', '30px');
    this._renderer.setElementStyle(this._calElement, 'left', '50%');
  }


  private _calendarDate: Date
  private _date: Date = undefined;
  private _calElement: Element;
  private _inputElement: Element;
  private _isclicked: boolean = false;
  private _overlay: Element;
  private _internalDate: string;
  private _justClicked: boolean = false;
  private _internalDateChanged: boolean = false;
  private active: boolean = false;
  private _isInitialized: boolean = false;

  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

constructor(private _element: ElementRef, private _renderer: Renderer) {

}

ngAfterContentInit() {
  this._overlay = document.getElementsByClassName('md-overlay-container')[0];
  let root: Element = this._element.nativeElement;
  this._calElement = root.getElementsByTagName('md-calendar')[0];
  this._inputElement = root.getElementsByTagName('md-input')[0];

  this._overlay.appendChild(this._calElement);
  this._isInitialized = true;
  this._calendarDate = this._date;
}



  clicked($event) {
    if (this.displayCalendar) return;
    this.setCalendarPosition();
    this._justClicked = true;
    this.displayCalendar = true;
    setTimeout(() => this.active = true, 10);
  }

  isInElement(element, x, y): boolean {
     let rect = element.getBoundingClientRect();

     return rect.top <= y &&
       y <= rect.top + rect.height &&
       rect.left <= x &&
       x <= rect.left + rect.width;
   }



     writeValue(value: any) {
       if (!value) {
        this.internalDate = value;
        return;
       }
       if (value instanceof Date) this.date = value; else {
         this.internalDate = value;
       }
     }

     registerOnChange(fn: any) {
       this._onChangeCallback = fn;
     }

     registerOnTouched(fn: any) {
       this._onTouchedCallback = fn;
     }



   ngOnDestroy() {
     this._overlay.removeChild(this._calElement);
   }
}

export const MD_DATETIMEPICKER_DIRECTIVES: any[] = [MDDateTimePicker];
