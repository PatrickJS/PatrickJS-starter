/// <reference path="../../typings/_custom.d.ts" />
import {Pipe} from 'angular2/angular2';

// Check if the value is supported for the pipe
export function isString(txt): boolean {
  return typeof txt === 'string';
}

// Simple example of a Pipe
@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe {
  regexp: RegExp = /([^\W_]+[^\s-]*) */g;

  supports(txt): boolean {
    return isString(txt);
  }

  transform(value: string, args?: Array<any>): any {
    return (!value) ? '' :
      (!args) ?
        this.capitalizeWord(value) :
        value.replace(this.regexp, this.capitalizeWord);
  }

  capitalizeWord(txt: string): string {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();

  }

}
