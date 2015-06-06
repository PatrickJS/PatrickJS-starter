/// <reference path="../../../typings/tsd.d.ts" />
import {bind, Inject} from 'angular2/di';
import {Store} from './Store';
// Using TypeScript we can define our state interface
interface ITodo {
  value: string;
  created_at: Date;
  completed?: boolean;
}
interface ITodoState {
  todos: Array<ITodo>
}

// We can also make a TodoStore to manage cache/localStorage
let initialTodoState:ITodoState = {
  todos: [
    { value:'finish example', created_at: new Date() },
    { value:'add tests',      created_at: new Date() },
    { value:'include development environment', created_at: new Date() },
    { value:'include production environment',  created_at: new Date() }
  ]
};

// Our Todo Service that uses Store helper class for managing our state
export class TodoService extends Store {
  // we shouldn't access ._state or ._setState outside of the class
  constructor(@Inject('initialTodoState') state: ITodoState) {
    // use Store class as a helper
    super(state);
  }

  add(todo) {
    // Async call to server then save state
    var todos = this.get('todos');
    todos.push({
      value: todo,
      created_at: new Date()
    });

    // Always Replace state
    this.set('todos', todos);
  }

  remove(index) {
    // Async call to server then save state
    var todos = this.get('todos');
    todos.splice(index, 1);

    // Always Replace state
    this.set({
      todos: todos
    });

  }

}//TodoService

export var todoInjectables = [
  bind('initialTodoState').toValue(initialTodoState),
  bind(TodoService).toClass(TodoService)
];
