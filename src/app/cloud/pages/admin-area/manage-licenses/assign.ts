import {
  Component,
  OnInit
} from '@angular/core';
import {ManageLicensesService} from "./manage-licenses.service";
import {LicenseCollection} from "../../../services/ddp/collections/licenses";
import {UserCollection} from "../../../services/ddp/collections/users";
import {AbstractRxComponent} from "../../../../code/angular/AbstractRxComponent";
import {MongoObservable} from "../../../../../../node_modules/meteor-rxjs/dist/ObservableCollection";
import {MeteorObservable} from "../../../../../../node_modules/meteor-rxjs/dist/MeteorObservable";
import {Subject} from "../../../../../../node_modules/rxjs/Subject";
import {ToastsManager} from "../../../../../../node_modules/ng2-toastr/src/toast-manager";
import {Observable} from "../../../../../../node_modules/rxjs/Observable";
import {ProductCollection} from "../../../services/ddp/collections/products";

@Component({
             selector: 'assign-license',
             templateUrl: 'assign.html'
           })
export class AssignLicenseComponent extends AbstractRxComponent implements OnInit {
  protected data                                  = {
    user: "",
    license: "",
    permission: "owner"
  };
  protected licenses: any;
  protected users: any;
  protected license: any;
  protected user: any;
  protected changeLicenseObservable: Subject<any> = new Subject();
  protected changeUserObservable: Subject<any>    = new Subject();
  
  constructor(protected manageLicense: ManageLicensesService,
              protected licenseCollection: LicenseCollection,
              protected userCollection: UserCollection,
              protected productCollection: ProductCollection,
              protected toast: ToastsManager) {
    super();
  }
  
  ngOnInit() {
    this.manageLicense.viewState.headerText = "Assign";
    this.initPageJs();
    this.resolveLicenseAndUsers();
  }
  
  private resolveLicenseAndUsers() {
    this._subscription['licenses'] = this.licenseCollection
                                         .getCollectionObservable()
                                         .subscribe((collection: MongoObservable.Collection<any>) => {
                                           this.licenses = collection.find({shop_owner_id: {$exists: false}}).fetch();
                                         });
    this._subscription['users']    = this.userCollection
                                         .getCollectionObservable()
                                         .subscribe((collection: MongoObservable.Collection<any>) => {
                                           this.users =
                                             collection.find({
                                                               "roles.cloud_group": {$elemMatch: {$eq: "user"}},
                                                               $or: [{has_license: {$exists: false}}, {has_license: {$size: 0}}]
                                                             })
                                                       .fetch();
                                         });
    this._subscription['license']  =
      Observable.combineLatest(this.licenseCollection.getCollectionObservable(),
                               this.productCollection.getCollectionObservable(),
                               this.changeLicenseObservable)
                .subscribe(([licenseCollection, productCollection, change]) => {
                  let license = licenseCollection.findOne({_id: this.data.license});
                  license.has_product.map(pro => {
                    const product = productCollection.collection.findOne({_id: pro['product_id']});
                    if (product)
                      pro['product_name'] = product['name'];
                    return pro;
                  });
                  this.license = license;
                });
    this._subscription['user']     = this.userCollection
                                         .getCollectionObservable()
                                         .combineLatest(this.changeUserObservable, (collection) => {
                                           return collection;
                                         })
                                         .subscribe((collection) => {
                                           this.user = collection.findOne({_id: this.data.user});
                                         });
    
  }
  
  protected changeLicense() {
    this.changeLicenseObservable.next();
  }
  
  protected changeUser() {
    this.changeUserObservable.next();
  }
  
  private initPageJs() {
    let vm = this;
    jQuery('.js-validation-assign-license').validate({
                                                       ignore: [],
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
                                                         'license': {
                                                           required: true
                                                         }, 'user': {
                                                           required: true
                                                         },
                                                       },
                                                       messages: {
                                                         'license': 'Please select a license!',
                                                         'user': 'Please select a user!',
                                                       },
                                                       submitHandler: function (form) {
                                                         vm.assignLicense();
                                                       }
                                                     });
  }
  
  private assignLicense() {
    MeteorObservable.call("license.assign_to_user", this.data).subscribe(() => {
      this.toast.success("Done");
    }, err => {
      this.toast.error(err['reason']);
    });
  }
}
