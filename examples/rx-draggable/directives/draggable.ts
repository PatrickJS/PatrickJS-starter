/// <reference path="../../typings/_custom.d.ts" />

import {Directive, EventEmitter, HostListener} from 'angular2/angular2';
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {ElementRef} from 'angular2/core';


@Directive({
  selector: '[draggable]'
})
export class Draggable {
  mousedrag;
  mouseup: EventEmitter<MouseEvent>   = new EventEmitter();
  mousedown: EventEmitter<MouseEvent> = new EventEmitter();
  mousemove: EventEmitter<MouseEvent> = new EventEmitter();

  @HostListener('mouseup', ['$event'])
  onMouseup(event) { this.mouseup.next(event); }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) { this.mousedown.next(event); }

  @HostListener('mousemove', ['$event'])
  onMousemove(event) { this.mousemove.next(event); }

  constructor(public element: ElementRef) {
    this.element.nativeElement.style.position = 'relative';
    this.element.nativeElement.style.cursor = 'pointer';

    this.mousedrag = this.mousedown.map((event: MouseEvent) => {
        event.preventDefault();
        return {
          left: event.clientX - this.element.nativeElement.getBoundingClientRect().left,
          top:  event.clientY - this.element.nativeElement.getBoundingClientRect().top
        };
      })
      .flatMap(imageOffset => this.mousemove.map((pos: MouseEvent) => ({
        top:  pos.clientY - imageOffset.top,
        left: pos.clientX - imageOffset.left
      }))
      .takeUntil(this.mouseup));

  }


  onInit() {
    this.mousedrag.subscribe({
      next: pos => {
        // Update position
        this.element.nativeElement.style.top  = pos.top  + 'px';
        this.element.nativeElement.style.left = pos.left + 'px';
      }
    });
  }

}
