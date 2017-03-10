import {
  Component,
  OnInit
} from '@angular/core';
import {ManageProductsService} from "./manage-products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductCollection} from "../../../services/ddp/collections/products";
import {MongoObservable} from "meteor-rxjs";
import * as moment from 'moment';
import {PriceCollection} from "../../../services/ddp/collections/prices";

@Component({
             selector: 'product-form',
             templateUrl: 'form.html'
           })
export class ProductFormComponent implements OnInit {
  id: string = "";
  protected prices: any;
  protected first_version = {
    name: "",
    version: "",
    created_at: "",
    updated_at: "",
  };
  protected product = {
    _id: "",
    name: "",
    additional_data: {
      description: ""
    },
    pricings: [],
    versions: []
  };
  protected form_title: string;
  protected version = {
    name: "",
    version: "",
    created_at: "",
    updated_at: "",
  };
  constructor(
    protected productService: ManageProductsService,
    private route: ActivatedRoute,
    protected priceCollection: PriceCollection,
    protected productCollection: ProductCollection,
    protected router: Router
  ) {
    route.params.subscribe((p) => {
      this.id = p['id'];
      if(this.id){
        this.form_title = 'Edit Product';
      }else{
        this.form_title = 'Add Product';
      }
    });
  }

  ngOnInit() {
    this.productCollection.getCollectionObservable().subscribe(
      (collection: MongoObservable.Collection<any>) => {
        if (this.id){
          this.product = collection.findOne({_id: this.id});
        }
      }
    );

    this.priceCollection.getCollectionObservable().subscribe(
      (collection: MongoObservable.Collection<any>) => {
        this.prices = collection.find({}).fetch();
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
                                                         },
                                                         'val-version_name'        : {
                                                           required: true
                                                         },
                                                         'val-version'        : {
                                                           required: true
                                                         },
                                                         'val-pricings': {
                                                           required : true
                                                         },
                                                       },
                                                       messages      : {
                                                         'val-product_name'        : {
                                                           required : 'Please enter product name',
                                                         },
                                                         'val-version_name'        : {
                                                           required : 'Please enter first version name',
                                                         },
                                                         'val-version'        : {
                                                           required : 'Please enter first version'
                                                         },
                                                         'val-pricings': {
                                                           required : 'Please select at least choose one pricing',
                                                         },
                                                       },
                                                       submitHandler: function (form) {
                                                         if(vm.id){
                                                           vm.productService.editProduct(vm.product);
                                                         }else{
                                                            vm.first_version['created_at'] = vm.first_version['updated_at'] = moment().format('YYYY-MM-DD');
                                                            vm.product.versions.push(vm.first_version);
                                                            vm.productService.createProduct(vm.product);
                                                         }
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
                                                         vm.version['created_at'] = vm.version['updated_at'] = moment().format('YYYY-MM-DD');
                                                         vm.product.versions.push(vm.version);
                                                         vm.productService.editProduct(vm.product);
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
