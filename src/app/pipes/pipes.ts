/// <reference path="../../../typings/tsd.d.ts" />
/*
 * Angular 2
 */
import {bind} from 'angular2/di';
import {PipeRegistry, defaultPipes} from 'angular2/change_detection';

/*
 * App Pipes
 */
import {rxAsync} from './RxPipe';

// include the default pipes and our own
export var appPipes = Object.assign({}, defaultPipes, {
  'async': rxAsync
  // add more pipes to this Map
});

export var appPipesRegistry = [
  bind(PipeRegistry).toValue(new PipeRegistry(appPipes))
];
