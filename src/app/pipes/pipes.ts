/// <reference path="../../typings/_custom.d.ts" />
/*
 * Angular 2
 */
import {bind, PipeRegistry, Pipes, defaultPipes} from 'angular2/angular2';

/*
 * App Pipes
 */
import {capitalize} from './CapitalizePipe';
import {rxAsync} from './RxPipe';


export var appPipes = [
  Pipes.append({
    'async': rxAsync,
    'capitalize': capitalize
    // add more pipes to this Map
  })
];
