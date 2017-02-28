import {
  Component,
  OnInit
} from '@angular/core';
import {BillingPricingService} from "../billing-pricing.service";

@Component({
             selector   : 'cloud-pricing',
             templateUrl: 'pricing.html'
           })
export class CloudPricingComponent implements OnInit {
  constructor(protected billingPricingService: BillingPricingService) { }
  
  ngOnInit() {
    this.billingPricingService.viewState.headerText = "Pricing";
  }
  
}
