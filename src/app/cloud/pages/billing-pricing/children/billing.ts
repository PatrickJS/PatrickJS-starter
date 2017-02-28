import {
  Component,
  OnInit
} from '@angular/core';
<<<<<<< HEAD

@Component({
             selector: 'cloud-billing',
             templateUrl: 'billing.html'
           })
export class CloudBillingComponent implements OnInit {
  constructor() { }
  
  ngOnInit() { }
=======
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
>>>>>>> 36bae05e9706c2b4ecaa338119d4adb51e5d7218
  
}
