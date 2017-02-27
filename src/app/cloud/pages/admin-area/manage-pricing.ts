import {
  Component,
  OnInit
} from '@angular/core';
import {ManagePricingService} from "./manage-pricing/manage-pricing.service";

@Component({
             selector : 'z-manage-pricing',
             template : `
 <!-- Page Header -->
                <div class="content bg-gray-lighter">
                    <div class="row items-push">
                        <div class="col-sm-7">
                            <h1 class="page-heading">
                                Manage Pricing <small>Create, update or remove pricing...</small>
                            </h1>
                        </div>
                        <div class="col-sm-5 text-right hidden-xs">
                            <ol class="breadcrumb push-10-t">
                                <li>Pricing</li>
                                <li><a class="link-effect">{{managePricingService.viewState.headerText}}</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
<!-- END Page Header -->
<router-outlet></router-outlet>`,
             providers: [
               ManagePricingService
             ]
           })
export class ManagePricingComponent implements OnInit {
  constructor(protected managePricingService: ManagePricingService) { }
  
  ngOnInit() { }
  
}
