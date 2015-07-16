/// <reference path="../../typings/tsd.d.ts" />

import { bind } from 'angular2/di';

import { todoInjectables } from './TodoService';
import { Github } from '../components/rxjs-examples/autosuggest/github';

// Include injectables that you want to have globally throughout our app
export var appServicesInjectables: Array<any> = [
  todoInjectables,
  bind('Searchable').toClass(Github)
];
