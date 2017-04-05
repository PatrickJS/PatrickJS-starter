import {
  Component,
  OnInit
} from '@angular/core';
import {MeteorObservable} from "meteor-rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";
import {ManageUsersService} from "./manage-users.service";
import {ToastsManager} from "ng2-toastr";


@Component({
             selector   : 'role',
             templateUrl: 'role.html'
           })
export class RolesComponent implements OnInit {
  protected role: any;
  protected roles: any;
  protected currentGroup: string;
  protected role_id: number;
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
          permissions: [
            {
              name: "Access to User Management",
              permission: "access_to_user_management",
              is_active: 0
            },
          ]
        },
        {
          section:"Users",
          permissions: [
            {
              name: "Create New User",
              permission: "create_new_user",
              is_active: 0
            },
            {
              name: "View User",
              permission: "view_user",
              is_active: 0
            },
            {
              name: "Edit User",
              permission: "edit_user",
              is_active: 0
            },
            {
              name: "Edit User",
              permission: "edit_user",
              is_active: 0
            }
          ]
        },
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
              protected userService: ManageUsersService) {}

  ngOnInit() {
    this.initPage();
  }

  private initPage(role_id?: number){

    if (!this.role_id){
      this.route.params.subscribe((p) => {
        this.role_id = p['id'];
      });
    }else{
      this.role_id = role_id;
    }

    this.userService.getAllRoles()
        .subscribe((data) => {
          this.roles = data;
          this.role = _.find(data, (rol) => {
            return rol.id == this.role_id;
          });
        });

    if (!!this.role_id) {
      this.userService.getAllPermissions(this.role_id)
          .subscribe((data) => {
            if (data.length > 0) {
              this.permissions = _.map(this.permissions, (group) => {
                let section_update = _.map(group.sections, (section) => {
                  let permission_update = _.map(section.permissions, (permission) => {
                    let perm             = _.find(data, (perm) => {
                      return perm.permission == permission.permission;
                    });
                    permission.is_active = perm.is_active;
                    return permission;
                  });
                  section.permissions   = permission_update;
                  return section;
                });
                group.sections     = section_update;
                return group;
              });
            }
          });
    }
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
                                                            _.forEach(group.sections, (section) => {
                                                              _.forEach(section.permissions, (permission) => {
                                                                permission.group = group.group;
                                                                permissions_data.push(permission);
                                                              });
                                                            });
                                                         });
                                                         let data = {
                                                           role_id: vm.role_id,
                                                           permissions: permissions_data
                                                         };

                                                         vm.userService.updatePermission(data)
                                                           .subscribe(() => {
                                                              vm.toast.success('Update Permission Successfully');
                                                           });

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
