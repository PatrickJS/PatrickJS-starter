/// <reference path="../../typings/_custom.d.ts" />
/*
 * Angular 2
 */
import {Pipes} from 'angular2/change_detection';

/*
 * App Pipes
 */
import {capitalize} from './CapitalizePipe';
import {rxAsync} from './RxPipe';


export var APP_PIPES = [
  Pipes.extend({
    'async': rxAsync,
    'capitalize': capitalize
    // add more pipes to this Map
  })
];
