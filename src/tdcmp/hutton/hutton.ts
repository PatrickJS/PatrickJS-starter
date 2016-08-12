import {Component, Input, Output, EventEmitter, HostListener, HostBinding
  , ElementRef, OnDestroy, Renderer, ViewEncapsulation, ContentChild } from '@angular/core';
import {MdIcon} from '@angular2-material/icon';
import {TDMenu} from '../menu/menu';


@Component({
    selector: 'hutton',
    template: `
    <span class="hutton">
    <span
      (mouseover)="setVisible(true)"
      (mouseleave)=setVisible(false)>
      <span (click)=labelClicked()><ng-content></ng-content></span>

      <span [class.hmd-icon]=!menu [class.hmd-menu]=menu [class.visible]=visible *ngIf="icon"
        (mouseover)="iconover=true;setVisible(true)"
        (mouseleave)="blurIcon()"
        (click)=clicked()>
        <ng-content select="trigger"></ng-content>
      </span>

    </span>

    </span>
    `,
    styles: [require('./hutton.scss')],
    encapsulation: ViewEncapsulation.None
  })
  export class Hutton {
    @ContentChild(MdIcon) icon: MdIcon;
    @ContentChild(TDMenu) menu: TDMenu;
    @Output() huttonClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() labelClick: EventEmitter<any> = new EventEmitter<any>();
    private visible: boolean;
    private iconover: boolean;
    private timer: any;

    setVisible(v: boolean) {
      clearTimeout(this.timer);
      if (!v) {
        this.timer = setTimeout(() => {
          if (!this.iconover) this.visible = false;
        }, 200);
      } else setTimeout(() => this.visible = v, 100);
    }

    blurIcon() {
      this.iconover = false;
      this.setVisible(false);
    }

    clicked() {
      this.huttonClick.emit(undefined);
    }

    labelClicked() {
      this.labelClick.emit(undefined);
    }

  }
