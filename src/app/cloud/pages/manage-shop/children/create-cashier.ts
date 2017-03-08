import {
  Component,
  OnInit
} from '@angular/core';
import {ManageShopService} from "../manage-shop.service";
import {LicenseCollection} from "../../../services/ddp/collections/licenses";
import * as _ from "lodash";
import {AuthService} from "../../../services/ddp/auth.service";
import {AbstractRxComponent} from "../../../../code/angular/AbstractRxComponent";
import {ProductCollection} from "../../../services/ddp/collections/products";
import {Observable} from "../../../../../../node_modules/rxjs/Observable";

@Component({
             selector: 'create-cashier',
             templateUrl: 'create-cashier.html'
           })
export class CreateCashierComponent extends AbstractRxComponent implements OnInit {
  constructor(protected manageShopService: ManageShopService,
              protected licenseCollection: LicenseCollection,
              protected authService: AuthService,
              protected productCollection: ProductCollection) {
    super();
  }
  
  protected _data        = {};
  protected license: any = {};
  
  ngOnInit() {
    this.initPageJs();
    this.manageShopService.viewState.headerText = "Create cashier";
    this.subscribeLicenseCollection();
  }
  
  subscribeLicenseCollection() {
    this._subscription['licenses'] =
      Observable.combineLatest(this.licenseCollection.getCollectionObservable(), this.productCollection.getCollectionObservable())
                // TODO: Chỗ này sẽ merge với product collection. Đây cũng là cách làm cho tất cả các collection sau này
                .subscribe(([licenseCollection, productCollection]) => {
                  let licenses = licenseCollection.collection.find().fetch();
                  if (_.size(licenses) == 1) {
                    this.license                      = licenses[0];
                    this.license.products_select_data = [];
                    _.forEach(this.license.has_product, p => {
                      const _p = productCollection.collection.findOne({_id: p['product_id']});
                      this.license.products_select_data.push({
                                                               id: p['product_id'],
                                                               text: _p ? _p['name'] : ""
                                                             });
                    });
                    jQuery('.cashier_products').select2({}).on('change', function () {
                      jQuery(this).valid();
                    });
                  }
                });
  }
  
  private initPageJs() {
    let vm = this;
    
    let initValidationMaterial = function () {
      jQuery('.js-validation-material').validate({
                                                   ignore: [],
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
                                                     'cashier_firstname': {
                                                       required: true,
                                                       minlength: 1
                                                     },
                                                     'cashier_lastname': {
                                                       required: true,
                                                       minlength: 1
                                                     },
                                                     'cashier_username': {
                                                       required: true,
                                                       minlength: 5
                                                     },
                                                     'cashier_email': {
                                                       required: true,
                                                       email: true
                                                     },
                                                     'cashier_products': {
                                                       required: true,
                                                       minlength: 1
                                                     },
                                                   },
                                                   messages: {
                                                     'cashier_username': {
                                                       required: 'Please enter a username',
                                                       minlength: 'Your username must consist of at least 5 characters'
                                                     },
                                                     'cashier_email': 'Please enter a valid email address',
                                                     'cashier_lastname': 'Please select a value!',
                                                     'cashier_firstname': 'Please select a value!',
                                                     'cashier_products': 'Please select a value!',
                                                   },
                                                   submitHandler: () => {
                                                     let data = {
                                                       first_name: vm._data['first_name'],
                                                       last_name: vm._data['last_name'],
                                                       email: vm._data['email'],
                                                       username: vm._data['username'],
                                                       isDisabled: vm._data['disabled'] == true,
                                                       products: jQuery("#cashier_products").val(),
                                                       license_id: vm.license['_id']
                                                     };
                                                     vm.manageShopService.createCashier(data);
                                                   }
                                                 });
    };
    initValidationMaterial();
  }
}
