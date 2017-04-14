import {
  Component,
  OnInit
} from '@angular/core';
import {ManageUsersService} from "./manage-users/manage-users.service";
import {ManageRolesService} from "./manage-roles/manage-roles.service";

@Component({
             selector : 'z-manage-roles',
             template : `
 <!-- Page Header -->
                <div class="content bg-gray-lighter">
                    <div class="row items-push">
                        <div class="col-sm-7">
                            <h1 class="page-heading">
                                Manage Roles <small>Create, update or remove roles...</small>
                            </h1>
                        </div>
                        <div class="col-sm-5 text-right hidden-xs">
                            <ol class="breadcrumb push-10-t">
                                <li>Roles</li>
                                <li><a class="link-effect">{{manageRoleService.viewState.headerText}}</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
<!-- END Page Header -->
<router-outlet></router-outlet>`,
             providers: [
               ManageRolesService,
               ManageUsersService
             ]
           })
export class ManageRolesComponent implements OnInit {
  constructor(protected manageRoleService: ManageRolesService) { }

  ngOnInit() { }

}
