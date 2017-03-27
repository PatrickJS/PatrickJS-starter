import {
  Component,
  OnInit
} from '@angular/core';
import {ManageProductsService} from "./manage-products/manage-products.service";

@Component({
             selector : 'z-manage-products',
             template : `
 <!-- Page Header -->
                <div class="content bg-gray-lighter">
                    <div class="row items-push">
                        <div class="col-sm-7">
                            <h1 class="page-heading">
                                Manage Products <small>Create, update or remove products...</small>
                            </h1>
                        </div>
                        <div class="col-sm-5 text-right hidden-xs">
                            <ol class="breadcrumb push-10-t">
                                <li>Products</li>
                                <li><a class="link-effect">{{manageProductService.viewState.headerText}}</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
<!-- END Page Header -->
<router-outlet></router-outlet>`,
             providers: [
               ManageProductsService
             ]
           })
export class ManageProductsComponent implements OnInit {
  constructor(protected manageProductService: ManageProductsService) { }
  
  ngOnInit() { }
  
}
