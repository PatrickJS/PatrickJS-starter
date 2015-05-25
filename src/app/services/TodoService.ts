import {bind, Inject} from 'angular2/di';

// Using TypeScript we can define our state interface
interface ITodoState {
  todos: Array<{
    value: string,
    created_at: Date
  }>
}

// We can also make a TodoStore to manage cache/localStorage
let _todoState:ITodoState = {
  todos: [
    {value:'finish example', created_at: new Date()},
    {value:'add tests', created_at: new Date()}
  ]
};

// Our Todo Service
export class TodoService {
  private state: ITodoState; // we shouldn't access .state directly
  constructor(@Inject('todoState') state) {
    this.state = state;
  }

  get(type) {
    return (type) ? this.state[type] : this.state;
  }

  add(todo) {
    // Async call to server then save state
    this.state.todos.push({
      value: todo,
      created_at: new Date()
    });
  }

  remove(index) {
    // Async call to server then save state
    this.state.todos.splice(index, 1);
  }

}//TodoService

export const todoInjectables = [
  bind('todoState').toValue(_todoState),
  bind(TodoService).toClass(TodoService)
];
