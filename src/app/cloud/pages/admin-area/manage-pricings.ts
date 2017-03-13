import {
  Component,
  OnInit
} from '@angular/core';
import {ManagePricingsService} from "./manage-pricings/manage-pricings.service";

@Component({
             selector : 'z-manage-products',
             template : `
 <!-- Page Header -->
                <div class="content bg-gray-lighter">
                    <div class="row items-push">
                        <div class="col-sm-7">
                            <h1 class="page-heading">
                                Manage Pricings <small>Create, update or remove pricings...</small>
                            </h1>
                        </div>
                        <div class="col-sm-5 text-right hidden-xs">
                            <ol class="breadcrumb push-10-t">
                                <li>Pricings</li>
                                <li><a class="link-effect">{{managePricingService.viewState.headerText}}</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
<!-- END Page Header -->
<router-outlet></router-outlet>`,
             providers: [
               ManagePricingsService
             ]
           })
export class ManagePricingsComponent implements OnInit {
  constructor(protected managePricingService: ManagePricingsService) { }

  ngOnInit() { }

}
