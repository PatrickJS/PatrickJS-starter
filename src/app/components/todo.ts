/// <reference path="../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, Directive} from 'angular2/angular2';
import {FormBuilder, Validators} from 'angular2/forms';

// directives
import {appDirectives} from '../directives/directives';
import {coreDirectives} from 'angular2/angular2';
// import {formDirectives} from 'angular2/forms';
import {formDirectives} from '../../common/formDirectives'; // current work around fix

// services
import {TodoService} from '../services/TodoService';



// Simple component
@Component({
  selector: 'todo'
})
@View({
  directives: [ coreDirectives, formDirectives, appDirectives ],
  styles: [`
  .error-message {
    color: red;
  }
  `],
  template: `
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
