/// <reference path="../../../../typings/_custom.d.ts" />

import {Directive, ElementRef} from 'angular2/angular2';
import * as Rx from 'rx';

@Directive({
  selector: '[drag-element]',
  host: {
    // Observable plz
    // '(mouseup)': 'onMouseup($event)',
    // '(mousedown)': 'onMousedown($event)'
    // '(window:mousemove)': 'onMousedown($event)'
  }
})
export class DragElement {
  mouseup:   Rx.Observable<any>;
  mousemove: Rx.Observable<any>;
  mousedown: Rx.Observable<any>;
  mousedrag: Rx.Observable<any>;
  constructor(private el: ElementRef) {

    this.mouseup   = this._fromDOMSource('mouseup', this.el.nativeElement)
    this.mousemove = this._fromDOMSource('mousemove', window.document);
    this.mousedown = this._fromDOMSource('mousedown', this.el.nativeElement).
      map(event => {
        event.preventDefault();
        // calculate offsets when mouse down
        var {clientY, clientX} = event;
        return {
         left: clientX - this.el.nativeElement.getBoundingClientRect().left,
         top:  clientY - this.el.nativeElement.getBoundingClientRect().top,
        };
      });

    // Combine mouse down with mouse move until mouse up
    this.mousedrag = this.mousedown.
      selectMany( imageOffset => {
        return this.mousemove.map(  pos => {
          var {clientY, clientX} =  pos;
          var {top, left} = imageOffset;
          // calculate offsets from mouse down to mouse moves
          return {
            top:  clientY - top,
            left: clientX - left
          };
        }).takeUntil(this.mouseup);
      });
    /*
    todo: Use requestAnimationFrame Scheduler
    */
    this.mousedrag.subscribe( pos => {
      var {top, left} = pos;
      var {style}     = this.el.nativeElement;
      // Update position
      // requestAnimationFrame
      style.top  = top  + 'px';
      style.left = left + 'px';
    });
  }

  _fromDOMSource(eventName: string, nativeElement: any): Rx.Observable<any> {
    return (<any>Rx).Observable.fromEventPattern(
      callback => nativeElement.addEventListener(eventName, callback, false),
      callback => nativeElement.removeEventListener(eventName, callback)
    );
  }

}
