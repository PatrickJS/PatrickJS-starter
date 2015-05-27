import {bind, Inject} from 'angular2/di';

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
let _todoState:ITodoState = {
  todos: [
    { value:'finish example', created_at: new Date() },
    { value:'add tests',      created_at: new Date() }
  ]
};

// Our Todo Service
export class TodoService {
  private _state: ITodoState; // we shouldn't access .state directly
  constructor(@Inject('todoState') state) {
    this._state = state;
  }

  get(type) {
    return (type) ? this._state[type] : this._state;
  }

  add(todo) {
    // Async call to server then save state
    this._state.todos.push({
      value: todo,
      created_at: new Date()
    });
  }

  remove(index) {
    // Async call to server then save state
    this._state.todos.splice(index, 1);
  }

}//TodoService

export const todoInjectables = [
  bind('todoState').toValue(_todoState),
  bind(TodoService).toClass(TodoService)
];
