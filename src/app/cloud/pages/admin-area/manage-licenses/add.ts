import {
  Component,
  OnInit
} from '@angular/core';
import {ProductCollection} from "../../../services/ddp/collections/products";
import {MongoObservable} from "meteor-rxjs";
import {UserCollection} from "../../../services/ddp/collections/users";
import {PriceCollection} from "../../../services/ddp/collections/prices";
import {ManageLicensesService} from "./manage-licenses.service";

@Component({
             selector   : 'add-license',
             templateUrl: 'add.html'
           })
export class AddLicenseComponent implements OnInit {

  protected products: any;
  protected users: any;
  protected prices: any;
  protected base_urls: string[] = [];
  protected currentProduct: any;
  protected options: Object;
  protected license = {
    shop_owner_id: "",
    shop_owner_username: "",
    status: "",
    has_product: [
      {
        product_id: "",
        base_urls: this.base_urls,
        pricing_id: "",
        start_version: "",
        purchase_date: "",
        expired_date: ""
      }
    ],
  };

  constructor(protected productCollection: ProductCollection,
              protected userCollection: UserCollection,
              protected priceCollection: PriceCollection,
              protected licenseService: ManageLicensesService) { }

  ngOnInit() {
    this.options = {
      locale: {
        format: 'YYYY-MM-DD'
      },
      singleDatePicker: true,
      showDropdowns: true
    };
    this.productCollection.getCollectionObservable().subscribe(
      (collection: MongoObservable.Collection<any>) => {
        this.products = collection.find({}).fetch();
      }
    );

    this.userCollection.getCollectionObservable().subscribe(
      (collection: MongoObservable.Collection<any>) => {
        this.users = collection.find({}).fetch();
      }
    );

    this.priceCollection.getCollectionObservable().subscribe(
      (collection: MongoObservable.Collection<any>) => {
        this.prices = collection.find({}).fetch();
      }
    );

    this.initPageJs();
  }

  private initPageJs() {
    let vm = this;
    let initValidationMaterial = function () {
      jQuery('.js-validation-license-form').validate({
                                                   ignore        : [],
                                                   errorClass    : 'help-block text-right animated fadeInDown',
                                                   errorElement  : 'div',
                                                   errorPlacement: function (error, e) {
                                                     jQuery(e).parents('.form-group > div').append(error);
                                                   },
                                                   highlight     : function (e) {
                                                     var elem = jQuery(e);

                                                     elem.closest('.form-group').removeClass('has-error').addClass('has-error');
                                                     elem.closest('.help-block').remove();
                                                   },
                                                   success       : function (e) {
                                                     var elem = jQuery(e);

                                                     elem.closest('.form-group').removeClass('has-error');
                                                     elem.closest('.help-block').remove();
                                                   },
                                                   rules         : {
                                                     'val-status': {
                                                       required: true
                                                     },
                                                      'val-product': {
                                                        required: true
                                                      },
                                                      'val-version': {
                                                        required: true
                                                      },
                                                      'val-price': {
                                                        required: true
                                                      },
                                                     'val-purchased_date': {
                                                        required: true
                                                     },
                                                     'val-expired_date' : {
                                                        required: true
                                                     }
                                                   },
                                                   messages      : {
                                                     'val-status': {
                                                       required: 'Please select first status of license'
                                                     },
                                                     'val-product': {
                                                       required: 'Please select a product'
                                                     },
                                                     'val-version': {
                                                       required: 'Please select start version of product'
                                                     },
                                                     'val-price': {
                                                       required: 'Please select a pricing plan for product'
                                                     },
                                                     'val-purchased_date': {
                                                       required: 'Please enter purchase date'
                                                     },
                                                     'val-expired_date': {
                                                       required: 'Please enter expired date'
                                                     },
                                                   },
                                                     submitHandler: function (form) {
                                                        vm.licenseService.createLicense(vm.license);
                                                     }
                                                 });
    };
    initValidationMaterial();
  }

  private onChange(event){
    this.productCollection.getCollectionObservable().subscribe(
      (collection: MongoObservable.Collection<any>) => {
        this.currentProduct = collection.findOne({_id: event.target.value});
      }
    );
  }

  private getOwnerName(event){
    this.userCollection.getCollectionObservable().subscribe(
      (collection: MongoObservable.Collection<any>) => {
        let shop_owner = collection.findOne({_id: event.target.value});
        if(shop_owner){
          this.license.shop_owner_username = shop_owner.username;
        }
      }
    );
  }

  private addBasedUrl(event){
    this.base_urls.push(event.target.value);
    event.target.value = "";
  }

  private selectedPurchaseDate(event){
    this.license.has_product[0].purchase_date = event.end._d;
  }

  private selectedExpireDate(event){
    this.license.has_product[0].expired_date = event.end._d;
  }
}
