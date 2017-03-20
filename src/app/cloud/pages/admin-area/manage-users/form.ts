import {
  Component,
  OnInit
} from '@angular/core';
import {ManageShopService} from "../manage-shop.service";
import {AuthService} from "../../../services/ddp/auth.service";
import {AbstractRxComponent} from "../../../../code/angular/AbstractRxComponent";
import {ManageUsersService} from "./manage-users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MongoObservable} from "meteor-rxjs";
import {UserCollection} from "../../../services/ddp/collections/users";
import {ToastsManager} from "ng2-toastr";

@Component({
             selector: 'user-form',
             templateUrl: 'form.html'
           })
export class UserFormComponent extends AbstractRxComponent implements OnInit {
  id: string = "";
  protected form_title: string;

  constructor(protected userService: ManageUsersService,
              protected userCollection: UserCollection,
              private route: ActivatedRoute,
              protected authService: AuthService,
              protected toast: ToastsManager,
              protected router: Router
  ) {
    super();
  }

  protected _data        = {};

  ngOnInit() {
    const params: Object = this.route.snapshot.params;
    if (params.hasOwnProperty('id') && !!params['id']) {
      this.userService.viewState.headerText = 'Edit User';
      this.id                               = params['id'];
    } else {
      this.userService.viewState.headerText = 'Add User';
    }

    this._subscription['user'] = this.userCollection
                                     .getCollectionObservable()
                                     .subscribe((collection: MongoObservable.Collection<any>) => {
                                       if (!!params['id']) {
                                         const user = collection.findOne({_id: this.id});
                                         if (user) {
                                           let first_name, last_name, is_disabled;
                                           if (this.checkHasOwnProperty(user, 'profile')){
                                             first_name = this.checkHasOwnProperty(user['profile'], 'first_name');
                                             last_name = this.checkHasOwnProperty(user['profile'], 'last_name');
                                             is_disabled = this.checkHasOwnProperty(user['profile'], 'is_disabled');
                                           }else{
                                             first_name = last_name = is_disabled = '';
                                           }

                                           this._data = {
                                             _id: user['_id'],
                                             username: user['username'],
                                             email: user['emails'][0]['address'],
                                             profile: {
                                               first_name: first_name,
                                               last_name: last_name,
                                               is_disabled: is_disabled
                                             }
                                           }
                                         } else {
                                           throw new Error("Can't find user");
                                         }
                                       }else{
                                         this._data = {
                                           username: '',
                                           email: '',
                                           profile: {
                                             first_name: '',
                                             last_name: '',
                                             is_disabled: ''
                                           }
                                         }
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
                                                     const data = vm._data;
                                                     if (vm.id){
                                                       vm.userService.editUser(data)
                                                         .then(() => {
                                                           vm.toast.success("Edit User Successful");
                                                           vm.router.navigate(['cloud/users']);
                                                          }).catch((err) => {
                                                            vm.toast.error(err);
                                                          });
                                                     }else{
                                                       vm.userService.createUser(data)
                                                         .then(() => {
                                                           vm.toast.success("Create User Successful");
                                                           vm.router.navigate(['cloud/users']);
                                                          }).catch((err) => {
                                                           vm.toast.error(err);
                                                         });
                                                     }
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
}
