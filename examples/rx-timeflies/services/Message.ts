/// <reference path="../../typings/_custom.d.ts" />
import {provide, Injectable} from 'angular2/angular2';

@Injectable()
export class Message {
  message: Array<string>;

  constructor() {
    this.message = ('TIME FLIES LIKE AN ARROW').split('');
  }

}


export var MESSAGE_PROVIDERS: Array<any> = [
  provide(Message, {useClass: Message})
];
