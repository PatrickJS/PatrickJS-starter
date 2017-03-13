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
import {ManageUsersService} from "./manage-users.service";
import {ActivatedRoute} from "@angular/router";
import {MongoObservable} from "meteor-rxjs";
import {UserCollection} from "../../../services/ddp/collections/users";

@Component({
             selector: 'user-form',
             templateUrl: 'form.html'
           })
export class UserFormComponent extends AbstractRxComponent implements OnInit {
  id: string = "";
  protected form_title: string;

  constructor(protected userService: ManageUsersService,
              protected userCollection: UserCollection,
              protected licenseCollection: LicenseCollection,
              private route: ActivatedRoute,
              protected authService: AuthService,
              protected productCollection: ProductCollection) {
    super();
    route.params.subscribe((p) => {
      this.id = p['id'];
      if (this.id) {
        this.userService.viewState.headerText = this.form_title = 'Edit User';
      } else {
        this.userService.viewState.headerText = this.form_title = 'Add User';
      }
    });
  }

  protected _data        = {};

  ngOnInit() {

    this.userCollection
        .getCollectionObservable()
        .subscribe((collection: MongoObservable.Collection<any>) => {
          if (!!this.id) {
            this._data = collection.findOne({_id: this.id});
          }
        });
    this.initPageJs();
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
                                                     'firstname': {
                                                       required: true,
                                                       minlength: 1
                                                     },
                                                     'lastname': {
                                                       required: true,
                                                       minlength: 1
                                                     },
                                                     'username': {
                                                       required: true,
                                                       minlength: 5
                                                     },
                                                     'email': {
                                                       required: true,
                                                       email: true
                                                     },
                                                   },
                                                   messages: {
                                                     'username': {
                                                       required: 'Please enter a username',
                                                       minlength: 'Your username must consist of at least 5 characters'
                                                     },
                                                     'email': 'Please enter a valid email address',
                                                     'lastname': 'Please select a value!',
                                                     'firstname': 'Please select a value!',
                                                   },
                                                   submitHandler: () => {
                                                     let data = {
                                                       _id: vm.id ? vm.id : "",
                                                       first_name: vm._data['first_name'],
                                                       last_name: vm._data['last_name'],
                                                       email: vm._data['email'],
                                                       username: vm._data['username'],
                                                       isDisabled: vm._data['disabled'] == true,
                                                       //products: jQuery("#cashier_products").val(),
                                                       //license_id: vm.license['_id']
                                                     };
                                                     if (vm.id){
                                                       vm.userService.editUser(data);
                                                     }else{
                                                       vm.userService.createUser(data);
                                                     }
                                                    }
                                                 });
    };
    initValidationMaterial();
  }
}
