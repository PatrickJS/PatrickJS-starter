import {
  Component,
  OnInit
} from '@angular/core';
import {ManageShopService} from "./manage-shop.service";
import {ManageUsersService} from "../admin-area/manage-users/manage-users.service";

@Component({
             selector : 'manage-shop',
             template : `
 <!-- Page Header -->
                <div class="content bg-gray-lighter">
                    <div class="row items-push">
                        <div class="col-sm-7">
                            <h1 class="page-heading">
                                Manage Shop <small>Create, update or remove users...</small>
                            </h1>
                        </div>
                        <div class="col-sm-5 text-right hidden-xs">
                            <ol class="breadcrumb push-10-t">
                                <li>Manage Shop</li>
                                <li><a class="link-effect">{{manageShop.viewState.headerText}}</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
<!-- END Page Header -->
<router-outlet></router-outlet>`,
             providers: [ManageShopService, ManageUsersService]
           })
export class ManageShopComponent implements OnInit {
  constructor(protected manageShop: ManageShopService) { }
  
  ngOnInit() { }
  
}
