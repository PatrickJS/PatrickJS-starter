/// <reference path="../../../../typings/_custom.d.ts" />

// Angular 2
import {Component, View, ElementRef} from 'angular2/angular2';
import {NgFor} from 'angular2/directives';

import {NgZone} from 'angular2/src/core/zone/ng_zone';

import {MessageService} from './MessageService';

import * as Rx from 'rx';


@Component({
  selector: 'timeflies',
  hostInjector: [ MessageService ]
})
@View({
  directives: [ NgFor ],
  template: `
  <div style="background-color: papayawhip; height: 500px;">
    <span *ng-for="#letter of letters"
          [style.color]="color"
          [style.left]="letter.left+'px'"
          [style.top]="letter.top+'px'"
          [style.position]="pos">
      {{ letter.text }}
    </span>
  </div>
  `
})
export class Timeflies {
  el: HTMLElement;
  pos   = 'absolute';
  color = 'red';
  letters: LetterConfig[];

  constructor(elementRef: ElementRef, service: MessageService, private zone: NgZone) {

    this.el = elementRef.nativeElement;

    // initial mapping (before mouse moves)
    this.letters = service.message.map(
      (val, idx) => ({
        text: val,
        top: 100,
        left: (idx*20 + 50),
        index: idx
      })
    );

    this.timeflies();
  }


  timeflies() {
    // run mouse move outside of Angular
    // got this hint from @mgonto
    this.zone.runOutsideAngular(_ => {
      (<any>Rx).Observable.fromEvent(this.el, 'mousemove').
        map((e: MouseEvent) => {
          //var offset = getOffset(this.el);

          // subtract offset of the element
          var o = this.el.getBoundingClientRect();

          return {
            offsetX : e.clientX - o.left,
            offsetY : e.clientY - o.top
          };
        }).
        flatMap(delta => {
          return Rx.Observable.fromArray(
            this.letters.map(
              (val, index) => ({
                letter: val.text,
                delta: delta,
                index: index
              })
            )
          );
        }).
        flatMap(letterConfig =>
          (<any>Rx).Observable.timer((letterConfig.index+1) * 100)
            .map(
            () => ({
              text: letterConfig.letter,
              top: letterConfig.delta.offsetY,
              left: letterConfig.delta.offsetX + letterConfig.index * 20 + 20,
              index: letterConfig.index
            })
          )
        ).
        subscribe(letterConfig => {

          //console.log(letterConfig, this.letters);

          // to render the letters, put them back into app zone
          this.zone.run(_ => this.letters[letterConfig.index] = letterConfig);

        });
    });//zone
  }// timeflies

}

interface LetterConfig {
  text: string;
  top: number;
  left: number;
  index: number;
}
