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
import {ProductCollection} from "../../../services/ddp/collections/products";
import {MongoObservable} from "meteor-rxjs";
import {Observable} from "rxjs";

@Component({
             selector   : 'cloud-pricing',
             templateUrl: 'pricing.html'
           })
export class CloudPricingComponent implements OnInit {
  protected products: Observable<any>;
  
  constructor(protected billingPricingService: BillingPricingService,
              protected productCollection: ProductCollection) {
  }
  
  ngOnInit() {
    this.billingPricingService.viewState.headerText = "Pricing";
    this.productCollection.getCollectionObservable().subscribe((collection: MongoObservable.Collection<any>) => {
      this.products = collection.find();
    });
  }
  
>>>>>>> 36bae05e9706c2b4ecaa338119d4adb51e5d7218
}
