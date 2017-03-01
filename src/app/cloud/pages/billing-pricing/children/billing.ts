import {
  Component,
  OnInit
} from '@angular/core';
import {BillingPricingService} from "../billing-pricing.service";

@Component({
             selector   : 'cloud-billing',
             templateUrl: 'billing.html'
           })
export class CloudBillingComponent implements OnInit {
  constructor(protected billingPricingService: BillingPricingService) { }

  ngOnInit() {
    this.billingPricingService.viewState.headerText = "Billing";
  }

}