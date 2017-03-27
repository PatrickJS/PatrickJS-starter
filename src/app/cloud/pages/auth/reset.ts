import {
  Component,
  OnInit
} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/ddp/auth.service";

@Component({
             selector   : 'reset-password',
             templateUrl: 'reset.html'
           })
export class ResetPasswordComponent implements OnInit {
  constructor(protected router: Router, protected authService: AuthService) { }
  
  ngOnInit() {
    if (this.authService.getCurrentUser())
      this.router.navigate(['']);
    else
      this.initPageJs();
  }
  
  private initPageJs() {
    let initValidationReminder = function () {
      jQuery('.js-validation-reminder').validate({
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
                                                     'reminder-email': {
                                                       required: true,
                                                       email   : true
                                                     }
                                                   },
                                                   messages      : {
                                                     'reminder-email': {
                                                       required: 'Please enter a valid email address'
                                                     }
                                                   },
                                                   submitHandler : function (form) {
          
                                                   }
                                                 });
    };
    initValidationReminder();
  }
  
}
