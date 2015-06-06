/// <reference path="../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, Directive, coreDirectives} from 'angular2/angular2';
import {formDirectives, FormBuilder, Control, ControlGroup, Validators} from 'angular2/forms';

// App
import {appDirectives} from '../directives/directives';
import {TodoService} from '../services/TodoService';



// Simple component
@Component({
  selector: 'todo'
})
    // <fieldset ng-control-group="todos">
    // </fieldset>
@View({
  directives: [ coreDirectives, formDirectives, appDirectives ],
  template: `
  <style>
    .error-message {
      color: red;

    }
  </style>

  <form [ng-form-model]="todoForm" (submit)="todoForm.valid && addTodo($event, todoForm.value.todo)"
  novalidate>

    <input type="text" [ng-form-control]="todoInput" autofocus required>

    <button>Add Todo</button>

    <span class="error-message" *ng-if="
      todoForm.errors?.required &&
      todoForm.dirty &&
      todoForm.controls.todo.touched
    ">
      Todo is required
    </span>

  </form>

  <ul>
    <li *ng-for="var todo of todoService.state.todos; var $index = index">
      <p>
        {{ todo.value }}
        <br>
        <button (click)="removeTodo($event, $index)">[Remove]</button>
        <small>{{ todo.created_at }}</small>
      </p>
    </li>
  </ul>
  `
})
export class Todo {
  todoForm: ControlGroup;
  todoInput: Control;
  state: any;
  constructor(
    public formBuilder: FormBuilder,
    public todoService: TodoService
  ) {

    this.todoForm = formBuilder.group({
      'todo': ['', Validators.required]
    })
    this.todoInput = this.todoForm.controls.todo

  }

  addTodo(event, todo) {
    event.preventDefault(); // prevent native page refresh

    this.todoService.add(todo);
    // update the view/model
    this.todoInput.updateValue('');
  }

  removeTodo(event, index) {
    event.preventDefault(); // prevent native page refresh

    this.todoService.remove(index);
  }

}
