/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../custom_typings/ng2.d.ts" />

// Angular 2
import {Component, View, Directive, coreDirectives} from 'angular2/angular2';
import {formDirectives, FormBuilder, Control, ControlGroup} from 'angular2/forms';

// App
import {appDirectives} from '../directives/directives';
import {TodoService} from '../services/TodoService';



// Simple component
@Component({
  selector: 'todo',
  appInjector: [ FormBuilder ]
})
@View({
  directives: [ coreDirectives, formDirectives, appDirectives ],
  template: `
  <form [control-group]="todoForm" (submit)="addTodo($event, todoInput.value)">
    <input name="todo" type="text" [control]="todoInput" autofocus>
    <button>Add Todo</button>
  </form>

  <ul>
    <li *ng-for="var todo of todoService.get('todos'); var $index = index">
      {{ todo.value }} <button (click)="removeTodo($event, $index)">[X]</button>
    </li>
  </ul>

  `
})
export class Todo {
  todoForm: ControlGroup;
  todoInput: Control;
  constructor(
    public formBuilder: FormBuilder,
    public todoService: TodoService
  ) {

    this.todoForm = formBuilder.group({
      'todo': ['']
    });
    this.todoInput = this.todoForm.controls.todo;

  }

  addTodo(event, value) {
    event.preventDefault(); // prevent native page refresh

    this.todoService.add(value);

    // this is needed until Angular adds an update dom feature or actions
    this._setDefaultInput(event.target, 'todo');
  }

  removeTodo(event, index) {
    event.preventDefault(); // prevent native page refresh

    this.todoService.remove(index);
  }

  _setDefaultInput(el, name) {
    // update stateful element and internal model to default values
    el.querySelector(`input[name=${name}]`).value = '';
    this.todoForm.controls[name].updateValue('');
  }

}
