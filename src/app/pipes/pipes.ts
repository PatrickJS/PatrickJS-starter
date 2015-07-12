/// <reference path="../../typings/_custom.d.ts" />
/*
 * Angular 2
 */
import {bind} from 'angular2/di';
import {PipeRegistry, Pipes, defaultPipes} from 'angular2/change_detection';

/*
 * App Pipes
 */
import {capitalize} from './CapitalizePipe';
import {rxAsync} from './RxPipe';

var newPipesBindings;

// Alpha.31
if (Pipes) {
  newPipesBindings = bind(Pipes).toValue(Pipes.append({
    'async': rxAsync,
    'capitalize': capitalize
    // add more pipes to this Map
  }));
}
// Alpha.30
else if (PipeRegistry) {
  // include the default pipes and our own
  let replaceBindings = Object.assign({}, defaultPipes, {
    'async': rxAsync,
    'capitalize': capitalize
    // add more pipes to this Map
  });
  newPipesBindings = bind(PipeRegistry).toValue(new PipeRegistry(replaceBindings));
}

export var appPipeInjectables = [
  newPipesBindings
];
