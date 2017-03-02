import {
  Component,
  OnInit
} from '@angular/core';
import {ManageProductsService} from "./manage-products.service";
import {ActivatedRoute} from "@angular/router";

@Component({
             selector: 'create-version',
             templateUrl: 'create-version.html'
           })
export class CreateVersionComponent implements OnInit {
  id: string = "";
  protected version = {
    name: "",
    version: ""
  };
  constructor(
    protected productService: ManageProductsService,
    private route: ActivatedRoute,
  ) {
    route.params.subscribe((p) => this.id = p['product_id']);
  }

  ngOnInit() {
    this.initPageJs();
  }

  private initPageJs() {
    let vm = this;
    let initValidationMaterial = function () {
      jQuery('.js-validation-version-form').validate({
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
                                                         'val-version_name'        : {
                                                           required : true
                                                         },
                                                         'val-version'        : {
                                                           required : true
                                                         }
                                                       },
                                                       messages      : {
                                                         'val-version_name'        : {
                                                           required : 'Please enter version name',
                                                         },
                                                         'val-version'        : {
                                                           required : 'Please enter version number',
                                                         }
                                                       },
                                                       submitHandler: function (form) {
                                                          let data = {
                                                            _id: vm.id,
                                                            versions: vm.version
                                                          };
                                                          vm.productService.createVersion(data);
                                                       }
                                                     });
    };
    initValidationMaterial();
  }

}
