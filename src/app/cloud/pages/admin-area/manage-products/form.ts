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
import {ToastsManager} from "ng2-toastr";
import {AbstractRxComponent} from "../../../../code/angular/AbstractRxComponent";

@Component({
             selector: 'product-form',
             templateUrl: 'form.html'
           })
export class ProductFormComponent extends AbstractRxComponent implements OnInit {
  id: string                      = "";
  protected prices: any;
  protected product               = {
    _id: "",
    code: "",
    name: "",
    additional_data: {
      description: ""
    },
    pricings: [],
    versions: []
  };
  protected listVersion: string[] = [];
  protected form_title: string;
  protected version               = {
    name: "",
    version: "",
    created_at: moment().toDate(),
    updated_at: moment().toDate(),
  };
  
  constructor(protected productService: ManageProductsService,
              private route: ActivatedRoute,
              protected priceCollection: PriceCollection,
              protected productCollection: ProductCollection,
              protected router: Router,
              protected toast: ToastsManager) {
    super();
    route.params.subscribe((p) => {
      this.id = p['id'];
      if (this.id) {
        this.productService.viewState.headerText = this.form_title = 'Edit Product';
      } else {
        this.productService.viewState.headerText = this.form_title = 'Add Product';
      }
    });
  }
  
  ngOnInit() {
    this.productCollection.getCollectionObservable().subscribe(
      (collection: MongoObservable.Collection<any>) => {
        if (this.id) {
          this.product = collection.findOne({_id: this.id});
        }
        if (this.product && _.isArray(this.product.versions)) {
          this.listVersion = _.map(this.product.versions, (v) => {
            return v.version;
          });
        }
      }
    );
    
    this.priceCollection.getCollectionObservable().subscribe(
      (collection: MongoObservable.Collection<any>) => {
        let priceSelect2Elem = jQuery("#val-pricings");
        this.prices          = collection.find({}).fetch();
        priceSelect2Elem.select2().on('change', function () {
          jQuery(this).valid();
        });
      }
    );
    this.initPageJs();
  }
  
  private initPageJs() {
    let vm                            = this;
    let initProductValidationMaterial = function () {
      jQuery('.js-validation-product-form').validate({
                                                       errorClass: 'help-block text-right animated fadeInDown',
                                                       errorElement: 'div',
                                                       errorPlacement: function (error, e) {
                                                         jQuery(e).parents('.form-group > div').append(error);
                                                       },
                                                       highlight: function (e) {
                                                         var elem = jQuery(e);
          
                                                         elem.closest('.form-group').removeClass('has-error').addClass('has-error');
                                                         elem.closest('.help-block').remove();
                                                       },
                                                       success: function (e) {
                                                         var elem = jQuery(e);
          
                                                         elem.closest('.form-group').removeClass('has-error');
                                                         elem.closest('.help-block').remove();
                                                       },
                                                       rules: {
                                                         'val-product_name': {
                                                           required: true
                                                         },
                                                         'val-product_code': {
                                                           required: true
                                                         },
                                                         'val-version_name': {
                                                           required: true
                                                         },
                                                         'val-version': {
                                                           required: true
                                                         },
                                                         'val-pricings': {
                                                           required: true,
                                                           minlength: 1
                                                         },
                                                       },
                                                       messages: {
                                                         'val-product_name': {
                                                           required: 'Please enter product name',
                                                         },
                                                         'val-product_code': {
                                                           required: 'Please enter product name',
                                                         },
                                                         'val-pricings': {
                                                           required: 'Please select at least choose one pricing',
                                                         },
                                                       },
                                                       submitHandler: function (form) {
                                                         if (vm.checkVersionExistTwice(vm.product.versions)) {
                                                           vm.toast.error('Version appear much than twice', 'Update Version');
                                                           return;
                                                         }
                                                         vm.product['pricings'] = jQuery("#val-pricings").val();
                                                         if (vm.id) {
                                                           vm.productService.editProduct(vm.product);
                                                         } else {
                                                           vm.productService.createProduct(vm.product);
                                                         }
                                                       }
                                                     });
    };
    initProductValidationMaterial();
  }
  
  protected isSelectedPrice(priceId): boolean {
    return !!(this.product && _.indexOf(this.product.pricings, priceId) > -1);
  }
  
  private addVersion() {
    this.product.versions.push(this.version);
    return false;
  }
  
  private removeVersion(version) {
    let index = this.product.versions.indexOf(version);
    if (this.id && this.product.versions.length == 1) {
      this.toast.error('Remove Version', 'Product need to have at least one version, you can not remove');
      return;
    }
    if (index) {
      this.product.versions.splice(index, 1);
    } else if (version.name == "") {
      const length = this.product.versions.length;
      this.product.versions.splice(length - 1, 1);
    } else {
      this.toast.error('Remove Version', 'Cannot find version of product');
    }
  }
  
  private checkVersionExistTwice(versions: any[]) {
    let counts = {};
    _.forEach(versions, (v, k) => {
      let version     = v['version'];
      counts[version] = counts[version] ? counts[version] + 1 : 1;
    });
    let arr_number = Object.keys(counts).map((key) => {
      return counts[key];
    }).filter((number) => {
      return number >= 2;
    });
    if (arr_number.length > 0)
      return true;
    return false;
  }
}
