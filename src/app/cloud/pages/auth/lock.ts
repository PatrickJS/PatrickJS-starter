import {
  Component,
  OnInit
} from '@angular/core';

@Component({
             selector   : 'account-lock',
             templateUrl: 'lock.html'
           })
export class LockAccountComponent implements OnInit {
  constructor() { }
  
  ngOnInit() {
    this.initPageJs();
  }
  
  private initPageJs() {
    let initValidationLock = function () {
      jQuery('.js-validation-lock').validate({
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
                                                 'lock-password': {
                                                   required : true,
                                                   minlength: 5
                                                 }
                                               },
                                               messages      : {
                                                 'lock-password': {
                                                   required : 'Please provide a password',
                                                   minlength: 'Your password must be at least 5 characters long'
                                                 }
                                               }
                                             });
    };
    
  }
}
