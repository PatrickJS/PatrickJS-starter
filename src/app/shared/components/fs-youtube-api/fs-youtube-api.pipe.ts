import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | fsYoutubeApiPipeFilterSearch:string
 * Example:
 *   {{ string |  string}}
*/
@Pipe({name: 'fsYoutubeApiPipeFilterSearch', pure:true})

export class fsYoutubeApiPipeFilterSearch implements PipeTransform {
  transform(value: string): Array<any> {
    var array = arguments[0] || null;
    var valueString = arguments[1] || '';
    var returnArray = [];
    array && (function(){
        Array.prototype.forEach.call(array, function(){
        if (('snippet' in arguments[0]) && arguments[0].snippet.title) {
          if (~arguments[0].snippet.title.toLowerCase().indexOf(valueString.toLowerCase())) {
            returnArray.push(arguments[0]);
          }
        }
      })
    }());

    return returnArray || [''];
  }
}
