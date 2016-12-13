import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { User }    from './user';
@Component({
  selector: 'user-form',
  templateUrl: 'user_form.component.html',
  styleUrls: ["user_form.component.css"]
})
export class UserFormComponent {
  submitted = false;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      'name': ['', Validators.required]
    });
  }

  onSubmit(form) { 
    console.log(form.value);
    this.submitted = true;  
  }
}