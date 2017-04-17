import {
  Component,
  OnInit
} from '@angular/core';
import {AuthService} from "../../services/ddp/auth.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
             selector   : 'sign-up',
             templateUrl: 'signup.html'
           })
export class SignUpComponent implements OnInit {
  protected user = {username: "", email: "", password: "", acceptTerm: false};
  
  constructor(protected router: Router, protected authService: AuthService, protected toast: ToastsManager) { }
  
  ngOnInit() {
    if (this.authService.getCurrentUser())
      this.router.navigate(['']);
    else
      this.initPageJs();
  }
  
  private initPageJs() {
    let vm                     = this;
    let initValidationRegister = function () {
      jQuery('.js-validation-register').validate({
                                                   errorClass    : 'help-block text-right animated fadeInDown',
                                                   errorElement  : 'div',
                                                   errorPlacement: function (error, e) {
                                                     jQuery(e).parents('.form-group > div').append(error);
                                                   },
                                                   highlight     : function (e) {
                                                     jQuery(e).closest('.form-group').removeClass('has-error').addClass('has-error');
                                                     jQuery(e).closest('.help-block').remove();
                                                   },
                                                   success       : function (e) {
                                                     jQuery(e).closest('.form-group').removeClass('has-error');
                                                     jQuery(e).closest('.help-block').remove();
                                                   },
                                                   rules         : {
                                                     'register-username' : {
                                                       required : true,
                                                       minlength: 6
                                                     },
                                                     'register-email'    : {
                                                       required: true,
                                                       email   : true
                                                     },
                                                     'register-password' : {
                                                       required : true,
                                                       minlength: 8
                                                     },
                                                     'register-password2': {
                                                       required: true,
                                                       equalTo : '#register-password'
                                                     },
                                                     'register-terms'    : {
                                                       required: true
                                                     }
                                                   },
                                                   messages      : {
                                                     'register-username' : {
                                                       required : 'Please enter a username',
                                                       minlength: 'Your username must consist of at least 6 characters'
                                                     },
                                                     'register-email'    : 'Please enter a valid email address',
                                                     'register-password' : {
                                                       required : 'Please provide a password',
                                                       minlength: 'Your password must be at least 8 characters long'
                                                     },
                                                     'register-password2': {
                                                       required : 'Please provide a password',
                                                       minlength: 'Your password must be at least 8 characters long',
                                                       equalTo  : 'Please enter the same password as above'
                                                     },
                                                     'register-terms'    : 'You must agree to the service terms!'
                                                   },
                                                   submitHandler : function (form) {
                                                     vm.authService.signUp(vm.user).then(() => {
                                                       alert('An verification is sent to your email, please verify it before signing in');
                                                     }, err => {});
                                                   }
                                                 });
    };
    initValidationRegister();
  }
}
