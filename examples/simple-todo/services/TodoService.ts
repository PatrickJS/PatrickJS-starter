/// <reference path="../../typings/_custom.d.ts" />

import {Injectable} from 'angular2/angular2';

// Our Todo Service
@Injectable()
export class TodoService {
  // we shouldn't access ._state outside of the class
  // our initial state defined above
  private _todos = [
    { value: 'finish example', created_at: new Date() },
    { value: 'add tests',      created_at: new Date() },
    { value: 'include development environment', created_at: new Date() },
    { value: 'include production environment',  created_at: new Date() }
  ];
  constructor() {

  }

  cloneTodos() {
    return this._todos.slice();
  }

  add(value) {
    // Async call to server then save state
    var todo = {
      value: value,
      created_at: new Date()
    };

    var todos = this.cloneTodos();
    todos.push(todo);

    // You can use .set to replace state
    this._todos = todos;
  }

  remove(index) {
    // Async call to server then save state

    var todos = this.cloneTodos();
    todos.splice(index, 1);

    // Always Replace state
    this._todos = todos;

  }

}//TodoService

// export our injectables for this module
export var TODO_BINDINGS: Array<any> = [
  TodoService
];
