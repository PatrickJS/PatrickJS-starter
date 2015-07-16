/// <reference path="../../typings/_custom.d.ts" />

import {bind} from 'angular2/di';

import {todoInjectables} from './TodoService';
import {githubInjectables} from '../components/rxjs-examples/autosuggest/Github';

// Include injectables that you want to have globally throughout our app
export var appServicesInjectables: Array<any> = [
  githubInjectables,
  todoInjectables,
];
