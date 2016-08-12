import { Response } from '@angular/http';
import {Json, isString} from '@angular/core/src/facade/lang';
import {isJsObject} from '@angular/http/src/http_utils';


export class DateUtils {

  public static addDays(d: Date, days: number): Date {
    const newDate = this.cloneDate(d);
    newDate.setDate(d.getDate() + days);
    return newDate;
  }

  public static cloneDate(d: Date): Date {
    return new Date(d.getTime());
  }

  public static getDaysInMonth(d: Date): number {
    const resultDate = this.getFirstDayOfMonth(d);

    resultDate.setMonth(resultDate.getMonth() + 1);
    resultDate.setDate(resultDate.getDate() - 1);

    return resultDate.getDate();
  }


  public static getFirstDayOfMonth(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }

  public static getFirstDayOfWeek(): Date {
    const now = new Date();
    return new Date(now.setDate(now.getDate() - now.getDay()));
  }

  public static getWeekArray(d: Date, firstDayOfWeek: number) {
    const dayArray: Array<Date> = [];
    const daysInMonth = this.getDaysInMonth(d);
    const weekArray = [];
    let week = [];

    for (let i = 1; i <= daysInMonth; i++) {
      dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
    }

    const addWeek = (week) => {
      const emptyDays = 7 - week.length;
      for (let i = 0; i < emptyDays; ++i) {
        week[weekArray.length ? 'push' : 'unshift'](undefined);
      }
      weekArray.push(week);
    };

    dayArray.forEach((day) => {
      if (week.length > 0 && day.getDay() === firstDayOfWeek) {
        addWeek(week);
        week = [];
      }
      week.push(day);
      if (dayArray.indexOf(day) === dayArray.length - 1) {
        addWeek(week);
      }
    });

    return weekArray;
  }

  public static addMonths(d: Date, months: number): Date {
  const newDate = this.cloneDate(d);
  newDate.setMonth(d.getMonth() + months);
  return newDate;
}

public static JsonDate(r: Response): any {

  if (isJsObject(r.text())) return r.text();

  if (isString(r.text())) {
        return JSON.parse(<string>r.text()
        , function (key, value) {
            if (typeof value === 'string') {
              if (/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})((?:\.\d*)?)(?:Z|(\+|-)([\d|:]*))?$/.exec(value))
              return new Date(value);
            }
            return value;
          }
        );
      }
}



}
