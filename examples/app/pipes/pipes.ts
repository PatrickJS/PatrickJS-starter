/// <reference path="../../typings/_custom.d.ts" />
/*
 * Angular 2
 */
import {Pipes} from 'angular2/change_detection';

/*
 * App Pipes
 */
import {rxAsync} from './RxPipe';
import {CapitalizePipe} from './CapitalizePipe';


export var APP_PIPES = [
  Pipes.extend({
    'async': rxAsync,
    'capitalize': capitalize
    // add more pipes to this Map
  })
];
