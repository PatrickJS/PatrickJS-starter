/// <reference path="../../typings/_custom.d.ts" />

import {bind} from 'angular2/angular2';

import {TODO_BINDINGS} from './TodoService';
import {GITHUB_BINDINGS} from './GithubService';

// Include injectables that you want to have globally throughout our app
export var APP_SERVICES_BINDINGS: Array<any> = [
  GITHUB_BINDINGS,
  TODO_BINDINGS
];
