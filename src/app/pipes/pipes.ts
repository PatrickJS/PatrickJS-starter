/// <reference path="../../typings/_custom.d.ts" />
/*
 * Angular 2
 */
import {Pipe} from 'angular2/angular2';

/*
 * App Pipes
 */
import {CapitalizePipe} from './CapitalizePipe';
import {RxPipe} from './RxPipe';


export * from './CapitalizePipe';
export * from './RxPipe';
export const APP_PIPES = [
  CapitalizePipe,
  RxPipe
];
