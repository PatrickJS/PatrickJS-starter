/// <reference path="../../typings/_custom.d.ts" />
import {Pipe, PipeFactory} from 'angular2/angular2';

// Check if the value is supported for the pipe
export function isString(txt): boolean {
  return typeof txt === 'string';
}

// Simple example of a Pipe
export class CapitalizePipe implements Pipe {
  regexp: RegExp = /([^\W_]+[^\s-]*) */g;

  supports(txt): boolean {
    return isString(txt);
  }
  transform(value: string, args?: List<any>): any {
    return (!value) ? '' :
      (!args) ?
        this.capitalizeWord(value) :
        value.replace(this.regexp, this.capitalizeWord);
  }
  capitalizeWord(txt: string): string {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  }
  onDestroy(): void {
    // not needed since this is stateless
  }

}

// We create a factory since we create an instance for each binding for stateful pipes
export class CapitalizeFactory implements PipeFactory {
  supports(txt): boolean {
    return isString(txt);
  }
  create(cdRef): Pipe {
    return new CapitalizePipe();
  }
}

// Since templates in angular are async we are passing the value to
// NullPipeFactory if the value is not supported
export var capitalize = [ new CapitalizeFactory() ];
