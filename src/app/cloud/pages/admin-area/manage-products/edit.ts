import {
  Component,
  OnInit
} from '@angular/core';
import {ManageProductsService} from "./manage-products.service";
import {ActivatedRoute} from "@angular/router";
import {ProductCollection} from "../../../services/ddp/collections/products";
import {MongoObservable} from "meteor-rxjs";

@Component({
             selector: 'edit-product',
             templateUrl: 'edit.html'
           })
export class EditProductComponent implements OnInit {
  id: string = "";
  protected product: any;
  constructor(
    protected productService: ManageProductsService,
    private route: ActivatedRoute,
    protected productCollection: ProductCollection,
  ) {
    route.params.subscribe((p) => this.id = p['id']);
  }

  ngOnInit() {
    this.productCollection.getCollectionObservable().subscribe(
      (collection: MongoObservable.Collection<any>) => {
        this.product = collection.findOne({_id: this.id});
        console.log(this.product);
      }
    );
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
                                                         }
                                                       },
                                                       messages      : {
                                                         'val-product_name'        : {
                                                           required : 'Please enter product name',
                                                         }
                                                       },
                                                       submitHandler: function (form) {
                                                         vm.productService.editProduct(vm.id, vm.product);
                                                       }
                                                     });
    };
    initValidationMaterial();
  }

}
