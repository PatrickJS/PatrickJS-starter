import {
  Component,
  OnInit
} from '@angular/core';
import {ManageProductsService} from "./manage-products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductCollection} from "../../../services/ddp/collections/products";
import {MongoObservable} from "meteor-rxjs";
import * as moment from 'moment';

@Component({
             selector: 'edit-product',
             templateUrl: 'edit.html'
           })
export class EditProductComponent implements OnInit {
  id: string = "";
  protected product: any;
  protected version = {
    name: "",
    version: ""
  };
  constructor(
    protected productService: ManageProductsService,
    private route: ActivatedRoute,
    protected productCollection: ProductCollection,
    protected router: Router
  ) {
    route.params.subscribe((p) => this.id = p['id']);
  }

  ngOnInit() {
    this.productCollection.getCollectionObservable().subscribe(
      (collection: MongoObservable.Collection<any>) => {
        this.product = collection.findOne({_id: this.id});
      }
    );
    this.initPageJs();
  }

  private initPageJs() {
    let vm = this;
    let initProductValidationMaterial = function () {
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
                                                         }
                                                       },
                                                       messages      : {
                                                         'val-product_name'        : {
                                                           required : 'Please enter product name',
                                                         }
                                                       },
                                                       submitHandler: function (form) {
                                                         let product_change = {
                                                           _id: vm.id,
                                                           name: vm.product.name,
                                                           additional_data: vm.product.additional_data
                                                         };
                                                         vm.productService.editProduct(product_change);
                                                       }
                                                     });
    };
    let initVersionValidationMaterial = function () {
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
                                                         data.versions["created_at"] = data.versions["updated_at"] = moment().toDate();
                                                         vm.productService.createVersion(data);
                                                       }
                                                     });
    };
    initProductValidationMaterial();
    initVersionValidationMaterial();
  }

  private changeDescription(event){
    this.product.additional_data['description'] = event.target.value;
  }

}
