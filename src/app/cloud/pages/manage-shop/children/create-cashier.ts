import {
  Component,
  OnInit
} from '@angular/core';
import {ManageShopService} from "../manage-shop.service";

@Component({
             selector   : 'create-cashier',
             templateUrl: 'create-cashier.html'
           })
export class CreateCashierComponent implements OnInit {
  constructor(protected manageShopService: ManageShopService) { }
  
  ngOnInit() {
    this.initPageJs();
    this.manageShopService.viewState.headerText = "Create cashier";
  }
  
  private initPageJs() {
    
    let initValidationMaterial = function () {
      jQuery('.js-validation-material').validate({
                                                   ignore        : [],
                                                   errorClass    : 'help-block text-right animated fadeInDown',
                                                   errorElement  : 'div',
                                                   errorPlacement: function (error, e) {
                                                     jQuery(e).parents('.form-group > div').append(error);
                                                   },
                                                   highlight     : function (e) {
                                                     var elem = jQuery(e);
          
                                                     elem.closest('.form-group').removeClass('has-error').addClass('has-error');
                                                     elem.closest('.help-block').remove();
                                                   },
                                                   success       : function (e) {
                                                     var elem = jQuery(e);
          
                                                     elem.closest('.form-group').removeClass('has-error');
                                                     elem.closest('.help-block').remove();
                                                   },
                                                   rules         : {
                                                     'cashier_firstname': {
                                                       required : true,
                                                       minlength: 1
                                                     },
                                                     'cashier_lastname' : {
                                                       required : true,
                                                       minlength: 1
                                                     },
                                                     'cashier_username' : {
                                                       required : true,
                                                       minlength: 5
                                                     },
                                                     'cashier_email'    : {
                                                       required: true,
                                                       email   : true
                                                     },
                                                     'cashier_products' : {
                                                       required : true,
                                                       minlength: 1
                                                     },
                                                   },
                                                   messages      : {
                                                     'cashier_username' : {
                                                       required : 'Please enter a username',
                                                       minlength: 'Your username must consist of at least 5 characters'
                                                     },
                                                     'cashier_email'    : 'Please enter a valid email address',
                                                     'cashier_lastname' : 'Please select a value!',
                                                     'cashier_firstname': 'Please select a value!',
                                                     'cashier_products' : 'Please select a value!',
                                                   }
                                                 });
    };
    jQuery('.js-select2').select2().on('change', function () {
      jQuery(this).valid();
    });
    initValidationMaterial();
  }
  
}
