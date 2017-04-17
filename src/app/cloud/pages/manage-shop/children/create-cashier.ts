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
import {ManageUsersService} from "../../admin-area/manage-users/manage-users.service";
import {Router, ActivatedRoute} from "@angular/router";
import {UserCollection} from "../../../services/ddp/collections/users";
import {MongoObservable} from "meteor-rxjs";

@Component({
             selector: 'create-cashier',
             templateUrl: 'create-cashier.html'
           })
export class CreateCashierComponent extends AbstractRxComponent implements OnInit {
  constructor(protected userService: ManageUsersService,
              protected manageShopService: ManageShopService,
              protected licenseCollection: LicenseCollection,
              protected authService: AuthService,
              protected productCollection: ProductCollection,
              private route: ActivatedRoute,
              protected userCollection: UserCollection) {
    super();
  }

  protected _data :any       = {};
  protected license: any = {};
  id: string = "";
  roles: any;
  protected form_title: string;

  ngOnInit() {

    this.initPageJs();

    const params: Object = this.route.snapshot.params;
    if (params.hasOwnProperty('id') && !!params['id']) {
      this.manageShopService.viewState.headerText = "Edit cashier";
      this.id                               = params['id'];
    } else {
      this.manageShopService.viewState.headerText = "Create cashier";
    }

    this._subscription['user'] = this.userCollection
                                     .getCollectionObservable()
                                     .subscribe((collection: MongoObservable.Collection<any>) => {
                                       if (!!params['id']) {
                                         let user = collection.findOne({_id: this.id});
                                         if (user) {
                                           let first_name, last_name, is_disabled;
                                           if (this.checkHasOwnProperty(user, 'profile')){
                                             first_name = this.checkHasOwnProperty(user['profile'], 'first_name');
                                             last_name = this.checkHasOwnProperty(user['profile'], 'last_name');
                                             is_disabled = this.checkHasOwnProperty(user['profile'], 'is_disabled');
                                           }else{
                                             first_name = last_name = is_disabled = '';
                                           }
                                            if (user.hasOwnProperty('has_license')){

                                            }
                                           this._data = {
                                             _id: user['_id'],
                                             username: user['username'],
                                             email: user['emails'][0]['address'],
                                             first_name: first_name,
                                             last_name: last_name,
                                             disabled: is_disabled,
                                             products: [],
                                             role: user['roles']['shop_group']
                                           };
                                         } else {
                                           throw new Error("Can't find user");
                                         }
                                       }else{
                                         this._data = {
                                           username: '',
                                           email: '',
                                           first_name: '',
                                           last_name: '',
                                           disabled: '',
                                           products: [],
                                           role: ""
                                         }
                                       }
                                     });

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
                    this.roles = this.license.has_roles;
                    this.license.products_select_data = [];
                    _.forEach(this.license.has_product, p => {
                      const _p = productCollection.collection.findOne({_id: p['product_id']});
                      if (!!this.id && p.hasOwnProperty('has_user')){
                        let checkUser = _.find(p['has_user'], (_u) => { return _u['user_id'] == this.id });
                        if (!!checkUser){
                          this._data['products'].push(p['product_id']);
                        }
                      }
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
                                                       isDisabled: vm._data['disabled'],
                                                       products: jQuery("#cashier_products").val(),
                                                       license_id: vm.license['_id'],
                                                     };
                                                     if (vm._data['role'])
                                                       data['role'] = vm._data['role'];

                                                     if (!!vm.id) {
                                                       data['_id'] = vm.id;
                                                       vm.manageShopService.editCashier(data);
                                                     }
                                                     else
                                                      vm.manageShopService.createCashier(data);
                                                   }
                                                 });
    };
    initValidationMaterial();
  }

  checkHasOwnProperty(data: any, property: string){
    if (data.hasOwnProperty(property)){
      return data[property];
    }else{
      return '';
    }
  }

  isSelectedProduct(product_id){
    return !!(_.indexOf(this._data.products, product_id) > -1);
  }

}
