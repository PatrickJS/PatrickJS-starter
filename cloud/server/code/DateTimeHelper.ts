import * as moment from 'moment';

export class DateTimeHelper {
  static getCurrentDate(): Date {
    return moment().toDate();
  }

  static randomDate(year: number, month: number, date: number): Date{
    return moment(year.toString() + '-' + month.toString() + '-' + date.toString(), ['YYYY-MM-DD', 'MM-DD-YYYY']).toDate();
  }
}