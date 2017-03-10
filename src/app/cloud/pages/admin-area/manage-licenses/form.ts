import {
  Component,
  OnInit, ElementRef
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductCollection} from "../../../services/ddp/collections/products";
import {MongoObservable} from "meteor-rxjs";
import {ManageLicensesService} from "./manage-licenses.service";
import {LicenseCollection} from "../../../services/ddp/collections/licenses";
import {UserCollection} from "../../../services/ddp/collections/users";
import {PriceCollection} from "../../../services/ddp/collections/prices";
import * as _ from "lodash";
import * as moment from 'moment';


@Component({
             selector: 'license-form',
             templateUrl: 'form.html'
           })
export class LicenseFormComponent implements OnInit {
  id: string = "";
  protected form_title: string;
  protected license = {
    id: "",
    shop_owner_id: "",
    shop_owner_username: "",
    status: "",
    has_product: [],
  };
  protected product_ids_license: string[];
  protected base_urls: string[] = [];
  protected product_list: any[];
  protected products: Object[] = [];
  protected users: any;
  protected prices: any;
  protected currentProduct: any;
  protected options = {
    locale: {
      format: 'YYYY-MM-DD'
    },
    singleDatePicker: true,
    showDropdowns: true
  };
  protected has_product: Object[] = [];
  constructor(
    protected licenseService: ManageLicensesService,
    protected productCollection: ProductCollection,
    protected userCollection: UserCollection,
    protected priceCollection: PriceCollection,
    private route: ActivatedRoute,
    protected licenseCollection: LicenseCollection,
    protected router: Router,
    private el:ElementRef
  ) {
    route.params.subscribe((p) => {
      this.id = p['id'];
      if(this.id){
        this.form_title = 'Edit License';
      }else{
        this.form_title = 'Add License';
      }
    });
  }

  ngOnInit() {
    this.licenseCollection.getCollectionObservable().subscribe(
      (collection: MongoObservable.Collection<any>) => {
        if (this.id){
          this.license = collection.findOne({_id: this.id});
          this.product_ids_license = _.map(this.license.has_product, (product) => {
            return product.product_id;
          });
        }
      }
    );

    this.productCollection.getCollectionObservable().subscribe(
      (collection: MongoObservable.Collection<any>) => {
        this.product_list = collection.find({}).fetch();
        this.products = _.map(this.product_list, (product) => {
          let object: any;
          if (this.id && this.product_ids_license.indexOf(product._id) > -1){
            let p_information = _.filter(this.license.has_product, (p) => {
              if (p.product_id == product._id){
                return p;
              }
            });
            this.base_urls = p_information[0].base_url;
            object = {
              checked: true,
              pricings: product.pricings,
              name: product.name,
              product_id: product._id,
              status: p_information[0].status,
              start_version: p_information[0].start_version,
              versions: product.versions,
              pricing_id: p_information[0].pricing_id,
              base_url: p_information[0].base_urls,
              purchase_date: moment(p_information[0].purchase_date).format("YYYY-MM-DD"),
              expired_date: moment(p_information[0].expired_date).format("YYYY-MM-DD")
            };
          }else {

            object = {
              checked: false,
              pricings: product.pricings,
              name: product.name,
              product_id: product._id,
              status: "",
              start_version: "",
              versions: product.versions,
              pricing_id: "",
              base_url: [],
              purchase_date: "",
              expired_date: ""
            };
          }
          return object;
        });
        _.forEach(this.products, (p) => {
          let purchase_date = "val-purchased_date" + p['product_id'];
          let expired_date = "val-expire_date" + p['product_id'];
          jQuery(this.el.nativeElement).find('#' + purchase_date).daterangepicker(this.options, (start, end, label) => {
            p['purchase_date'] = start.format('YYYY-MM-DD');
          });
          jQuery(this.el.nativeElement).find('#' + expired_date).daterangepicker(this.options, (start, end, label) => {
            p['expired_date'] = start.format('YYYY-MM-DD');
          });
        });
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
    let initLicenseValidationMaterial = function () {
      jQuery('.js-validation-license-form').validate({
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
                                                         'val-status'        : {
                                                           required : true
                                                         }
                                                       },
                                                       messages      : {
                                                         'val-status'        : {
                                                           required : 'Please select status',
                                                         }
                                                       },
                                                       submitHandler: function (form) {
                                                          let result = _.filter(vm.products, (product) => {
                                                            if (product['checked']){
                                                              return product;
                                                            }
                                                         });
                                                          if (vm.id){
                                                            vm.license = {
                                                              id: vm.id,
                                                              shop_owner_id: vm.license.shop_owner_id,
                                                              shop_owner_username: vm.license.shop_owner_username,
                                                              status: vm.license.status,
                                                              has_product: result
                                                            };
                                                            vm.licenseService.editLicense(vm.license);
                                                          }else{
                                                            vm.license = {
                                                              id: "",
                                                              shop_owner_id: vm.license.shop_owner_id,
                                                              shop_owner_username: vm.license.shop_owner_username,
                                                              status: vm.license.status,
                                                              has_product: result
                                                            };
                                                            vm.licenseService.createLicense(vm.license);
                                                          }
                                                       }
                                                     });
    };
    initLicenseValidationMaterial();
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

  private addBasedUrl(product, event){
    if (event.target.value){
      product.base_url.push(event.target.value);
      event.target.value = "";
    }
  }

  private removeUrl(product, url){
    let index = product.base_url.indexOf(url);
    product.base_url.splice(index, 1);
  }

  trackById(index: number, obj: any): any {
    return index;
  }
}