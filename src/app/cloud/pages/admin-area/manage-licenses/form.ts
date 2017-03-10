import {
  Component,
  OnInit, ElementRef
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductCollection} from "../../../services/ddp/collections/products";
import {MongoObservable} from "meteor-rxjs";
import {ManageLicensesService} from "./manage-licenses.service";
import {LicenseCollection} from "../../../services/ddp/collections/licenses";
import {UserCollection} from "../../../services/ddp/collections/users";
import {PriceCollection} from "../../../services/ddp/collections/prices";
import * as _ from "lodash";
import * as moment from 'moment';
import {AbstractRxComponent} from "../../../../code/angular/AbstractRxComponent";
import {Observable} from "../../../../../../node_modules/rxjs/Observable";


@Component({
             selector: 'license-form',
             templateUrl: 'form.html'
           })
export class LicenseFormComponent extends AbstractRxComponent implements OnInit {
  id: string                   = "";
  protected form_title: string;
  protected license: any       = {};
  protected products: Object[] = [];
  protected users: any;
  protected prices: any;
  
  constructor(protected licenseService: ManageLicensesService,
              protected productCollection: ProductCollection,
              protected userCollection: UserCollection,
              protected priceCollection: PriceCollection,
              private route: ActivatedRoute,
              protected licenseCollection: LicenseCollection,
              protected router: Router,
              private el: ElementRef) {
    super();
    route.params.subscribe((p) => {
      this.id = p['id'];
      if (this.id) {
        this.licenseService.viewState.headerText = this.form_title = 'Edit License';
      } else {
        this.licenseService.viewState.headerText = this.form_title = 'Add License';
      }
    });
  }
  
  ngOnInit() {
    this._subscription['license'] =
      Observable.combineLatest(this.licenseCollection.getCollectionObservable(),
                               this.productCollection.getCollectionObservable())
                .subscribe(([licenseCollection, productCollection]) => {
                             let licenseHasProductIds = [];
                             if (this.id) {
                               this.license = licenseCollection.findOne({_id: this.id});
          
                               if (this.license) {
                                 licenseHasProductIds = _.map(this.license.has_product, (product: any) => {
                                   return product.product_id;
                                 });
                               }
                             }
        
                             const products = productCollection.collection.find({}).fetch();
                             this.products  = _.map(products, (product) => {
                               let object: any;
                               if (this.id && licenseHasProductIds.indexOf(product._id) > -1) {
                                 let _productInfo = _.find(this.license.has_product, (p: any) => p.product_id == product._id);
                                 object           = {
                                   checked: true,
                                   pricings: product.pricings,
                                   name: product.name,
                                   product_id: product._id,
                                   status: _productInfo.status,
                                   start_version: _productInfo.start_version,
                                   versions: product.versions,
                                   pricing_id: _productInfo.pricing_id,
                                   base_url: _productInfo.base_url,
                                   purchase_date: moment(_productInfo.purchase_date).format("YYYY-MM-DD"),
                                   expired_date: moment(_productInfo.expired_date).format("YYYY-MM-DD")
                                 };
                               } else {
                                 object = {
                                   checked: false,
                                   pricings: product.pricings,
                                   name: product.name,
                                   product_id: product._id,
                                   status: "",
                                   start_version: "",
                                   versions: product.versions,
                                   pricing_id: "",
                                   base_url: [],
                                   purchase_date: "",
                                   expired_date: ""
                                 };
                               }
                               return object;
                             });
        
                             setTimeout(() => {
                               this.initPurchaseDatetimePicker();
                             }, 300);
                           }
                );
    
    
    this.userCollection
        .getCollectionObservable()
        .subscribe((collection: MongoObservable.Collection<any>) => {
                     this.users = collection.find({}).fetch();
                   }
        );
    
    this.priceCollection
        .getCollectionObservable()
        .subscribe((collection: MongoObservable.Collection<any>) => {
                     this.prices = collection.find({}).fetch();
                   }
        );
    
    this.initPageJs();
  }
  
  private initPurchaseDatetimePicker() {
    if (this.products && _.isArray(this.products))
      _.forEach(this.products, (p: Object) => {
        let purchase_date = "val-purchased_date" + p['product_id'];
        let expired_date  = "val-expire_date" + p['product_id'];
        
        if (!p.hasOwnProperty('purchase_date') || !p['purchase_date'])
          p['purchase_date'] = moment().toDate();
        if (!p.hasOwnProperty('expired_date') || !p['expired_date'])
          p['expired_date'] = moment().toDate();
        
        jQuery(this.el.nativeElement).find('#' + purchase_date)
                                     .daterangepicker({
                                                        startDate: moment(p['purchase_date']),
                                                        locale: {
                                                          format: 'YYYY-MM-DD'
                                                        },
                                                        singleDatePicker: true,
                                                        showDropdowns: true
                                                      },
                                                      (start, end, label) => {
                                                        p['purchase_date'] = start.toDate();
                                                      });
        jQuery(this.el.nativeElement).find('#' + expired_date)
                                     .daterangepicker({
                                                        startDate: moment(p['expired_date']),
                                                        locale: {
                                                          format: 'YYYY-MM-DD'
                                                        },
                                                        singleDatePicker: true,
                                                        showDropdowns: true
                                                      },
                                                      (start, end, label) => {
                                                        p['expired_date'] = start.toDate();
                                                      });
      });
  }
  
  private initPageJs() {
    let vm                            = this;
    let initLicenseValidationMaterial = function () {
      jQuery('.js-validation-license-form').validate({
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
                                                         'val-status': {
                                                           required: true
                                                         }
                                                       },
                                                       messages: {
                                                         'val-status': {
                                                           required: 'Please select status',
                                                         }
                                                       },
                                                       submitHandler: function (form) {
                                                         let result = _.filter(vm.products, (product) => {
                                                           if (product['checked']) {
                                                             return product;
                                                           }
                                                         });
                                                         if (vm.id) {
                                                           vm.license = {
                                                             id: vm.id,
                                                             shop_owner_id: vm.license.shop_owner_id,
                                                             shop_owner_username: vm.license.shop_owner_username,
                                                             status: vm.license.status,
                                                             has_product: result
                                                           };
                                                           vm.licenseService.editLicense(vm.license).then(() => { }, e => { });
                                                         } else {
                                                           vm.license = {
                                                             id: "",
                                                             shop_owner_id: vm.license.shop_owner_id,
                                                             shop_owner_username: vm.license.shop_owner_username,
                                                             status: vm.license.status,
                                                             has_product: result
                                                           };
                                                           vm.licenseService.createLicense(vm.license);
                                                         }
                                                       }
                                                     });
    };
    initLicenseValidationMaterial();
  }
  
  protected getOwnerName(event) {
    let user = _.find(this.users, u => u['_id'] = event);
    if (user)
      return user['username'];
  }
  
  protected addBasedUrl(product, event) {
    if (!!event.target.value) {
      console.log(product);
      if (!_.isArray(product['base_url'])) {
        product['base_url'] = [];
      }
      product['base_url'].push(event.target.value);
      event.target.value = "";
    }
    return false;
  }
  
  protected removeBaseUrl(product, url) {
    let index = product.base_url.indexOf(url);
    product.base_url.splice(index, 1);
  }
}
