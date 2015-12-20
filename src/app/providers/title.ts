import {Injectable} from 'angular2/core';

@Injectable()
export class Title {
  value: string;
  constructor() {
    this.value = 'Angular 2';
  }
}
