import {
  Component,
  OnInit
} from '@angular/core';
import * as _ from "lodash";
import {ActivatedRoute, Router} from "@angular/router";
import {ManageRolesService} from "./manage-roles.service";
import {ManageUsersService} from "../manage-users/manage-users.service";
import {ToastsManager} from "ng2-toastr";
import {AbstractRxComponent} from "../../../../code/angular/AbstractRxComponent";
import {Observable} from "rxjs";
import {LicenseCollection} from "../../../services/ddp/collections/licenses";

@Component({
             selector: 'role-form',
             templateUrl: 'form.html'
           })
export class RoleFormComponent extends AbstractRxComponent implements OnInit {
  id: string = "";
  protected form_title: string;
  protected role: any = {
    name: "",
    is_active: ""
  };
  protected roles: any;
  protected license: any = {};

  constructor(private route: ActivatedRoute,
              protected toast: ToastsManager,
              protected router: Router,
              protected roleService: ManageRolesService,
              protected userService: ManageUsersService,
              protected licenseCollection: LicenseCollection){
    super();
  }

  ngOnInit(){
    this.route.params.subscribe((p) => {
      this.id = p['id'];
      if (this.id) {
        this.roleService.viewState.headerText = this.form_title = 'Edit Role';
      } else {
        this.roleService.viewState.headerText = this.form_title = 'Add Role';
      }
    });

    this._subscription['licenses'] =
      Observable.combineLatest(this.licenseCollection.getCollectionObservable())
                .subscribe(([licenseCollection]) => {
                  let licenses = licenseCollection.collection.find().fetch();
                  if (_.size(licenses) == 1) {
                    this.license = licenses[0];
                    if (this.license.hasOwnProperty('has_roles')){
                      this.roles = this.license.has_roles;
                      if (!!this.id) {
                        this.role = _.find(this.roles, (rol) => {
                          return rol['code'] == this.id;
                        });
                      }
                    }
                  }
                });

    this.initPageJs();
  }

  private initPageJs() {
    let vm                            = this;
    let initFormMaterial = function () {
      jQuery('.js-validation-role-form').validate({
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
                                                         'val-role_name': {
                                                           required: true
                                                         },
                                                         'val-status': {
                                                           required: true
                                                         },
                                                       },
                                                       messages: {
                                                         'val-role_name': {
                                                           required: 'Please enter role name',
                                                         },
                                                         'val-status': {
                                                           required: 'Please select one role status',
                                                         },
                                                       },
                                                       submitHandler: function (form) {
                                                         let data = vm.role;
                                                         data['license_id'] = vm.license['_id'];
                                                          if (!!vm.id){
                                                            vm.roleService.editRole(data);
                                                          }else{
                                                            vm.roleService.addRole(data);
                                                          }
                                                       }
                                                     });
    };
    initFormMaterial();
  }
}
