import {
  Component,
  OnInit
} from '@angular/core';
<<<<<<< HEAD

@Component({
             selector: 'billing-pricing',
             template: `<router-outlet></router-outlet>`
           })
export class BillingPricingComponent implements OnInit {
  constructor() { }
=======
import {BillingPricingService} from "./billing-pricing.service";

@Component({
             selector : 'billing-pricing',
             template : `
<!-- Page Header -->
<div class="content bg-gray-lighter">
  <div class="row items-push">
    <div class="col-sm-8">
      <h1 class="page-heading">
       Billing & Pricing  <small>The default branch is considered the “base” branch in your repository</small>
      </h1>
    </div>
    <div class="col-sm-4 text-right hidden-xs">
      <ol class="breadcrumb push-10-t">
        <li>Billing & Pricing</li>
        <li><a class="link-effect" href="">{{billingPricingService.viewState.headerText}}</a></li>
      </ol>
    </div>
  </div>
</div>
<!-- END Page Header -->
<router-outlet></router-outlet>`,
             providers: [BillingPricingService]
           })
export class BillingPricingComponent implements OnInit {
  constructor(protected billingPricingService: BillingPricingService) { }
>>>>>>> 36bae05e9706c2b4ecaa338119d4adb51e5d7218
  
  ngOnInit() { }
  
}
