<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cloud-pricing',
    templateUrl: 'pricing.html'
})
export class CloudPricingComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
    
=======
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
  
>>>>>>> 36bae05e9706c2b4ecaa338119d4adb51e5d7218
}
