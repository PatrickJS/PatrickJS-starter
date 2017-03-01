import {
  Component,
  OnInit
} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/ddp/auth.service";

@Component({
             selector   : 'sign-in',
             templateUrl: 'signin.html'
           })
export class SignInComponent implements OnInit {
  protected user = {
    username: "",
    password: ""
  };

  constructor(protected router: Router, protected authService: AuthService) { }

  ngOnInit() {
    if (this.authService.getCurrentUser())
      this.router.navigate(['']);
    else
      this.initPageJs();
  }

  private initPageJs() {
    let vm                  = this;
    // Init Login Form Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
    let initValidationLogin = function () {
      jQuery('.js-validation-login').validate({
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
                                                  'login-username': {
                                                    required : true,
                                                    minlength: 6
                                                  },
                                                  'login-password': {
                                                    required : true,
                                                    minlength: 8
                                                  }
                                                },
                                                messages      : {
                                                  'login-username': {
                                                    required : 'Please enter a username',
                                                    minlength: 'Your username must consist of at least 6 characters'
                                                  },
                                                  'login-password': {
                                                    required : 'Please provide a password',
                                                    minlength: 'Your password must be at least 8 characters long'
                                                  }
                                                },
                                                submitHandler : function (form) {
                                                  vm.authService.signIn(vm.user).then(() => {}, err => {
                                                  });
                                                }
                                              });
    };
    initValidationLogin();
  }

}