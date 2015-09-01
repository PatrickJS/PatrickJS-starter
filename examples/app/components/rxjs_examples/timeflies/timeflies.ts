/// <reference path="../../../../typings/_custom.d.ts" />

// Angular 2
import {Component, View, ElementRef, NgZone, LifecycleEvent, CORE_DIRECTIVES} from 'angular2/angular2';

// Services
import {MESSAGE_BINDINGS, Message} from './Message';

import * as Rx from 'rx';
var Observable = Rx.Observable;

interface LetterConfig {
  text: string;
  top: number;
  left: number;
  index: number;
}

@Component({
  selector: 'timeflies',
  lifecycle: [ LifecycleEvent.onInit ],
  bindings: [ MESSAGE_BINDINGS ]
})
@View({
  directives: [ CORE_DIRECTIVES ],
  template: `
  <div style="background-color: papayawhip; height: 500px;">
    <span *ng-for="#letter of letters"
          [style.color]="color"
          [style.left]="letter.left + 'px'"
          [style.top]="letter.top + 'px'"
          [style.position]="pos">
      {{ letter.text }}
    </span>
  </div>
  `
})
export class Timeflies {
  pos   = 'absolute';
  color = 'red';
  letters: LetterConfig[];

  constructor(private service: Message, private el: ElementRef, private zone: NgZone) {

    // initial mapping (before mouse moves)
    this.letters = this.service.message.map(
      (val, idx) => ({
        text: val,
        top: 100,
        left: (idx * 20 + 50),
        index: idx
      })
    );

  }


  onInit() {
    // run mouse move outside of Angular
    // got this hint from @mgonto
    this.zone.runOutsideAngular(() => {
      (<any>Observable).fromEvent(this.el.nativeElement, 'mousemove').
        map((e: MouseEvent) => {
          //var offset = getOffset(this.el);

          // subtract offset of the element
          var o = this.el.nativeElement.getBoundingClientRect();

          return {
            offsetX: e.clientX - o.left,
            offsetY: e.clientY - o.top
          };
        }).
        flatMap(delta => {
          return (<any>Observable).fromArray(this.letters.map((val, index) => ({
            letter: val.text,
            delta: delta,
            index: index
          })));
        }).
        flatMap(letterConfig => {
          return (<any>Observable).timer((letterConfig.index + 1) * 100).map(() => ({
            text:  letterConfig.letter,
            top:   letterConfig.delta.offsetY,
            left:  letterConfig.delta.offsetX + letterConfig.index * 20 + 20,
            index: letterConfig.index
          }));
        }).
        subscribe(letterConfig => {

          //console.log(letterConfig, this.letters);

          // to render the letters, put them back into app zone
          this.zone.run(() => this.letters[letterConfig.index] = letterConfig);

        });
    });//zone
  }// timeflies

}
