/// <reference path="../../typings/_custom.d.ts" />

import {todoInjectables} from './TodoService';

// Include injectables that you want to have globally throughout our app
export var appServicesInjectables: Array<any> = [
  todoInjectables
];
