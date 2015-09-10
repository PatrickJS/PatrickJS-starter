// Angular 2
import {bootstrap} from 'angular2/angular2';
import {Component, View} from 'angular2/angular2';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

class UserModel {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app'
})
@View({
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ],
  template: `
  <form (ng-submit)="submit()">
    <p>
      <label for="firstName">
        First Name

        <input
          type="text"
          id="firstName"
          ng-control="firstName"
          [(ng-model)]="model.firstName"
          required>

      </label>
    </p>

    <p>
      <label for="lastName">
        Last Name

        <input
          type="text"
          id="lastName"
          ng-control="lastName"
          [(ng-model)]="model.lastName"
          required>

      </label>
      <show-error control="lastName" [errors]="['required']"></show-error>
    </p>

    <button> Submit</button>

  </div>

  <pre>this.model = {{ model | json }}</pre>
  `
})
class App {
  model = new UserModel();
  submit() {
    console.log('Submit Form', this.model);

  }
}



bootstrap(App);



