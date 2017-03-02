import {
  Component,
  OnInit
} from '@angular/core';
import {ManageProductsService} from "./manage-products.service";

@Component({
             selector: 'create-product',
             templateUrl: 'create.html'
           })
export class CreateProductComponent implements OnInit {
  protected version = [{
      name: "",
      version: ""
    }];
  protected product = {
    name: "",
    additional_data: {
      description: ""
    },
    versions: this.version
  };
  constructor(
    protected productService: ManageProductsService
  ) { }
  
  ngOnInit() {
    this.initPageJs();
  }

  private initPageJs() {
    let vm = this;
    let initValidationMaterial = function () {
      jQuery('.js-validation-product-form').validate({
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
                                                     'val-product_name'        : {
                                                       required : true
                                                     },
                                                     'val-version_name'        : {
                                                       required : true
                                                     },
                                                     'val-version'        : {
                                                       required : true
                                                     }
                                                   },
                                                   messages      : {
                                                     'val-product_name'        : {
                                                       required : 'Please enter product name',
                                                     }
                                                   },
                                                    submitHandler: function (form) {
                                                      vm.productService.createProduct(vm.product);
                                                    }
                                                 });
    };
    initValidationMaterial();
  }
  
}
