import {
  Component,
  OnInit
} from '@angular/core';
import {ManageProductsService} from "./manage-products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MongoObservable} from "meteor-rxjs";
import * as moment from 'moment';
import {PriceCollection} from "../../../services/ddp/collections/prices";
import {ToastsManager} from "ng2-toastr";
import {AbstractRxComponent} from "../../../../code/angular/AbstractRxComponent";
import {ManagePricingsService} from "./manage-pricings.service";

@Component({
             selector: 'pricing-form',
             templateUrl: 'form.html'
           })
export class PricingFormComponent extends AbstractRxComponent implements OnInit {
  id: string                      = "";
  protected prices: any;
  protected pricing               = {
    code: "",
    name: "",
    display_name: "",
    type: "",
    cost: "",
    visibility: "",
    description: ""
  };
  protected form_title: string;

  constructor(protected priceService: ManagePricingsService,
              private route: ActivatedRoute,
              protected priceCollection: PriceCollection,
              protected router: Router,
              protected toast: ToastsManager) {
    super();
    route.params.subscribe((p) => {
      this.id = p['id'];
      if (this.id) {
        this.priceService.viewState.headerText = this.form_title = 'Edit Pricing';
      } else {
        this.priceService.viewState.headerText = this.form_title = 'Add Pricing';
      }
    });
  }

  ngOnInit() {
    this.priceCollection.getCollectionObservable().subscribe(
      (collection: MongoObservable.Collection<any>) => {
        if (this.id) {
          this.pricing = collection.findOne({_id: this.id});
        }
      }
    );
    this.initPageJs();
  }

  private initPageJs() {
    let vm                            = this;
    let initPricingValidationMaterial = function () {
      jQuery('.js-validation-pricing-form').validate({
                                                       errorClass: 'help-block text-right animated fadeInDown',
                                                       errorElement: 'div',
                                                       errorPlacement: function (error, e) {
                                                         jQuery(e).parents('.form-group > div').append(error);
                                                       },
                                                       highlight: function (e) {
                                                         var elem = jQuery(e);

                                                         elem.closest('.form-group').removeClass('has-error').addClass('has-error');
                                                         elem.closest('.help-block').remove();
                                                       },
                                                       success: function (e) {
                                                         var elem = jQuery(e);

                                                         elem.closest('.form-group').removeClass('has-error');
                                                         elem.closest('.help-block').remove();
                                                       },
                                                       rules: {
                                                         'val-pricing_name': {
                                                           required: true
                                                         },
                                                         'val-pricing_code': {
                                                           required: true
                                                         },
                                                         'val-display_name': {
                                                           required: true
                                                         },
                                                         'val-type': {
                                                           required: true
                                                         },
                                                         'val-cost': {
                                                           required: true,
                                                         },
                                                         'val-visibility': {
                                                           required: true
                                                         },
                                                       },
                                                       messages: {
                                                         'val-pricing_name': {
                                                           required: 'Please enter pricing name',
                                                         },
                                                         'val-pricing_code': {
                                                           required: 'Please enter pricing name',
                                                         },
                                                         'val-display_name': {
                                                           required: 'Please enter pricing display name',
                                                         },
                                                         'val-type': {
                                                           required: 'Please select one pricing type',
                                                         },
                                                         'val-cost': {
                                                           required: 'Please enter pricing code',
                                                         },
                                                         'val-visibility': {
                                                           required: 'Please select visibility of pricing',
                                                         }
                                                       },
                                                       submitHandler: function (form) {
                                                         if (vm.id) {
                                                           vm.priceService.editPricing(vm.pricing);
                                                         } else {
                                                           vm.priceService.createPricing(vm.pricing);
                                                         }
                                                       }
                                                     });
    };
    initPricingValidationMaterial();
  }
}
