import {
  Component,
  OnInit
} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ManageUsersService} from "../../admin-area/manage-users/manage-users.service";
import {AbstractRxComponent} from "../../../../code/angular/AbstractRxComponent";
import {Observable} from "rxjs";
import {LicenseCollection} from "../../../services/ddp/collections/licenses";

@Component({
             selector: 'shop-roles',
             templateUrl: 'shop-roles.html'
           })
export class ShopRolesComponent extends AbstractRxComponent implements OnInit {
  protected role: any;
  protected roles: any;
  protected currentGroup: string;
  protected role_id: number;
  protected license: any = {};
  protected permissions: any = [
    {
      group: "xretail_permissions",
      group_name: "XRetail Permissions",
      sections: [
        {
          section:"XRetail Configurations",
          permissions: [
            {
              name: "Access to General Settings",
              permission: "access_to_general_settings",
              is_active: 0
            },
            {
              name: "Email Configuration",
              permission: "email_configuration",
              is_active: 0
            },
            {
              name: "Debug Mode",
              permission: "debug_mode",
              is_active: 0
            }
          ]
        },
      ],
    },
    {
      group: "xuser_permissions",
      group_name: "XUser Permissions",
      sections: [
        {
          section:"Roles and Permissions",
          permissions: [
            {
              name: "View, Edit, Create, Delete Role",
              permission: "view_edit_create_delete_role",
              is_active: 0
            },
            {
              name: "View, Edit Role Permission",
              permission: "view_edit_role_permission",
              is_active: 0
            }
          ]
        },
      ],
    },
    {
      group: "xreport_permissions",
      group_name: "XReport Permissions",
      sections: [
        {
          section:"Reports",
          permissions: [
            {
              name: "Access to XReport",
              permission: "access_to_xreport",
              is_active: 0
            },
            {
              name: "View And Generate Sale Report",
              permission: "view_and_generate_sale_report",
              is_active: 0
            },
            {
              name: "View And Generate Payment Report",
              permission: "view_and_generate_payment_report",
              is_active: 0
            },
            {
              name: "View And Generate Shift Detail Report",
              permission: "view_and_generate_shift_detail_report",
              is_active: 0
            }
          ]
        },
      ]
    },
    {
      group: "xpos_permissions",
      group_name: "XPOS Permissions",
      sections: [
        {
          section:"XPOS Settings",
          permissions: [
            {
              name: "Access XPOS to Setting",
              permission: "access_xpos_to_setting",
              is_active: 0
            },
            {
              permission: "Access To XPOS",
              name: "access_to_xpos",
              is_active: 0
            },
          ]
        },
        {
          section:"Product",
          permissions: [
            {
              name: "Allow Using Custom Sale",
              permission: "allow_using_custom_sale",
              is_active: 0
            },
          ]
        },
        {
          section:"Customer",
          permissions: [
            {
              name: "Create New Customer",
              permission: "create_new_customer",
              is_active: 0
            },
            {
              name: "Change Customer Information",
              permission: "change_customer_information",
              is_active: 0
            },
          ]
        },
        {
          section:"Register",
          permissions: [
            {
              name: "Change Register Information",
              permission: "change_register_information",
              is_active: 0
            },
            {
              name: "Open And Close Register",
              permission: "open_and_close_register",
              is_active: 0
            },
            {
              name: "Make Adjustment On Register",
              permission: "make_adjustment_on_register",
              is_active: 0
            },
          ]
        },
        {
          section:"Sales And Transaction",
          permissions: [
            {
              name: "Create Orders",
              permission: "create_orders",
              is_active: 0
            },
            {
              name: "Custom Price",
              permission: "custom_price",
              is_active: 0
            },
            {
              name: "Add Discount",
              permission: "add_discount",
              is_active: 0
            },
            {
              name: "Make Shipment",
              permission: "make_shipment",
              is_active: 0
            },
            {
              name: "View Order List",
              permission: "view_order_list",
              is_active: 0
            },
            {
              name: "Make Refund",
              permission: "make_refund",
              is_active: 0
            },
          ]
        },
      ]
    },
  ];
  constructor(protected toast: ToastsManager,
              private route: ActivatedRoute,
              private router: Router,
              protected userService: ManageUsersService,
              protected licenseCollection: LicenseCollection) {
    super();
  }

  ngOnInit() {
    this.initPage();
  }

  subscribeLicenseCollection() {
    this._subscription['licenses'] =
      Observable.combineLatest(this.licenseCollection.getCollectionObservable())
                .subscribe(([licenseCollection]) => {
                  let licenses = licenseCollection.collection.find().fetch();
                  if (_.size(licenses) == 1) {
                    this.license = licenses[0];
                    if (this.license.hasOwnProperty('has_roles')){
                      this.roles = this.license.has_roles;
                      if (!!this.role_id) {
                        this.role = _.find(this.roles, (rol) => {
                          return rol['code'] == this.role_id;
                        });
                        if (this.role.hasOwnProperty('has_permissions') &&
                            _.isArray(this.role['has_permissions']) &&
                            this.role['has_permissions'].length >
                            0) {
                          this.permissions = _.map(this.permissions, (group: any) => {
                            let section_update = _.map(group['sections'], (section) => {
                              let permission_update  = _.map(section['permissions'], (permission) => {
                                let perm                = _.find(this.role['has_permissions'], (perm) => {
                                  return perm['permission'] == permission['permission'];
                                });
                                permission['is_active'] = perm['is_active'];
                                return permission;
                              });
                              section['permissions'] = permission_update;
                              return section;
                            });
                            group['sections']  = section_update;
                            return group;
                          });
                        }
                      }
                    }
                  }
                });
  }

  private initPage(role_id?: number){

    if (!this.role_id){
      this.route.params.subscribe((p) => {
        this.role_id = p['id'];
      });
    }else{
      this.role_id = role_id;
    }

    this.subscribeLicenseCollection();

    this.initPageJs();
  }

  private initPageJs() {
    let vm                            = this;
    let initValidationMaterial = function () {
      jQuery('.js-validation-permission').validate({
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
                                                     },
                                                     messages: {
                                                     },
                                                     submitHandler: function (form) {
                                                       let permissions_data = [];
                                                       _.forEach(vm.permissions, (group) => {
                                                         _.forEach(group['sections'], (section) => {
                                                           _.forEach(section['permissions'], (permission) => {
                                                             permission['group'] = group['group'];
                                                             permissions_data.push(permission);
                                                           });
                                                         });
                                                       });
                                                       let data = {
                                                         role_id: vm.role_id,
                                                         permissions: permissions_data
                                                       };

                                                       vm.userService.updatePermission(data);

                                                     }
                                                   });
    };
    initValidationMaterial();
  }

  setCurrentGroup(group: string){
    this.currentGroup = group;
  }

  getCurrentGroup(){
    if (!this.currentGroup){
      this.currentGroup = this.permissions[0].group;
    }
    return this.currentGroup;
  }

  redirect(role_id: number){
    this.router.navigate(['/cloud/users/roles', role_id]);
    this.initPage(role_id);
  }
  
}
