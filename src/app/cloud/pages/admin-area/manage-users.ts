import {
  Component,
  OnInit
} from '@angular/core';
import {ManageUsersService} from "./manage-users/manage-users.service";

@Component({
             selector : 'z-manage-users',
             template : `
 <!-- Page Header -->
                <div class="content bg-gray-lighter">
                    <div class="row items-push">
                        <div class="col-sm-7">
                            <h1 class="page-heading">
                                Manage Users <small>Create, update or remove users...</small>
                            </h1>
                        </div>
                        <div class="col-sm-5 text-right hidden-xs">
                            <ol class="breadcrumb push-10-t">
                                <li>Users</li>
                                <li><a class="link-effect">{{manageUserService.viewState.headerText}}</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
<!-- END Page Header -->
<router-outlet></router-outlet>`,
             providers: [
               ManageUsersService
             ]
           })
export class ManageUsersComponent implements OnInit {
  constructor(protected manageUserService: ManageUsersService) { }

  ngOnInit() { }

}
