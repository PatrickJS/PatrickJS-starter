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

@Component({
             selector   : 'assign-license',
             templateUrl: 'assign.html'
           })
export class AssignLicenseComponent extends AbstractRxComponent implements OnInit {
  protected data = {
    user   : "",
    license: ""
  };
  protected licenses: any;
  protected users: any;
  
  constructor(protected manageLicense: ManageLicensesService,
              protected licenseCollection: LicenseCollection,
              protected userCollection: UserCollection) {
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
                                           this.users = collection.find({"roles.cloud_group": {$elemMatch: {$eq: "user"}}}).fetch();
                                         });
    
  }
  
  private initPageJs() {
    let vm = this;
    jQuery('.js-validation-assign-license').validate({
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
                                                         'license': {
                                                           required: true
                                                         }, 'user': {
                                                           required: true
                                                         },
                                                       },
                                                       messages      : {
                                                         'license': 'Please select a license!',
                                                         'user'   : 'Please select a user!',
                                                       },
                                                       submitHandler : function (form) {
                                                         vm.assignLicense();
                                                       }
                                                     });
  }
  
  private assignLicense() {
    MeteorObservable.call("license.assign_to_user", this.data).subscribe();
  }
}
