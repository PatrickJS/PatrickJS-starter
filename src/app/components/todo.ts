/// <reference path="../../typings/_custom.d.ts" />

/*
 * Angular 2
 */
import {Component, View, Directive, FormBuilder} from 'angular2/angular2';
import {Validators} from 'angular2/forms';

/*
 * Directives
 * angularDirectives: Angular's core/form/router directives
 * appDirectives: Our collection of directives from /directives
 */
import {appDirectives, angularDirectives} from '../directives/directives';

/*
 * Services
 */
import {TodoService} from '../services/TodoService';



// Simple form component example
@Component({
  selector: 'todo'
})
@View({
  directives: [ angularDirectives, appDirectives ],
  template: `
  <style>
    .error-message {
      color: red;
    }
    form {
      padding:16px;
    }
  </style>
  <form
    [ng-form-model]="todoForm"
    (submit)="todoForm.valid && addTodo($event, todoInput.value)"
    novalidate
  >
    <input type="text" [ng-form-control]="todoInput" autofocus>

    <button>Add Todo</button>

    <span class="error-message" *ng-if="
      todoForm.errors?.required &&
      todoForm.dirty &&
      todoForm.controls?.todo?.touched
    ">
      Todo is required
    </span>

  </form>

  <ul>
    <li *ng-for="var todo of todoService.get('todos'); var $index = index">
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
  todoForm:  any;
  todoInput: any;
  state: any;
  constructor(
    public formBuilder: FormBuilder,
    public todoService: TodoService
  ) {

    this.todoForm = formBuilder.group({
      'todo': ['', Validators.required]
    });
    this.todoInput = this.todoForm.controls.todo;

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
