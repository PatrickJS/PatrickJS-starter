/// <reference path="../../../typings/tsd.d.ts" />
import {Pipe, PipeFactory, NullPipeFactory} from 'angular2/change_detection';

// Check if the value is supported for the pipe
export function isString(txt) {
  return txt && typeof txt === 'string';
}

// Simple example of a Pipe
export class CapitalizePipe implements Pipe {
  regexp: RegExp;
  constructor() {
    this.regexp = /([^\W_]+[^\s-]*) */g;
  }
  supports(txt) {
    return isString(txt);
  }
  transform(input, isEveryWord) {
    return (!input) ? '' :
      (!isEveryWord) ?
        this.capWord(input) :
        input.replace(this.regexp, this.capWord);
  }
  capWord(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  }

}

// We create a factory since we create an instance for each binding for stateful pipes
export class CapitalizeFactory implements PipeFactory {
  supports(txt) {
    return isString(txt);
  }
  create(cdRef): Pipe {
    return new CapitalizePipe();
  }
}

// Since templates in angular are async we are passing the value to
// NullPipeFactory if the value is not supported
export var capitalize = [ new CapitalizeFactory(), new NullPipeFactory() ];
