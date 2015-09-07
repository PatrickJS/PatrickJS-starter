/// <reference path="../../typings/_custom.d.ts" />
/*
 * Angular 2
 */
import {Pipes} from 'angular2/change_detection';

/*
 * App Pipes
 */
import {CapitalizePipe} from './CapitalizePipe';
import {RxPipe} from './RxPipe';


export const APP_PIPES = [
  CapitalizePipe,
  RxPipe
];
