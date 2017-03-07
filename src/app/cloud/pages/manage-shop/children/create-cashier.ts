import {
    Component,
    OnInit
} from '@angular/core';
import {ManageShopService} from "../manage-shop.service";
import {LicenseCollection} from "../../../services/ddp/collections/licenses";
import * as _ from "lodash";
import {AuthService} from "../../../services/ddp/auth.service";
import {AbstractRxComponent} from "../../../../code/angular/AbstractRxComponent";
import {AppService} from "../../../../app.service";

@Component({
               selector: 'create-cashier',
               templateUrl: 'create-cashier.html'
           })
export class CreateCashierComponent extends AbstractRxComponent implements OnInit {
    constructor(protected manageShopService: ManageShopService,
                protected licenseCollection: LicenseCollection,
                protected authService: AuthService,
                protected appService: AppService) {
        super();
    }
    
    protected license: any = {};
    
    ngOnInit() {
        this.initPageJs();
        this.manageShopService.viewState.headerText = "Create cashier";
        this.subscribeLicenseCollection();
    }
    
    subscribeLicenseCollection() {
        this._subscription['licenses'] = this.licenseCollection
                                             .getCollectionObservable()
                                             .subscribe((collection) => {
                                                 let licenses = collection.collection.find().fetch();
                                                 if (_.size(licenses) == 1) {
                                                     this.license = licenses[0];
                                                     console.log(this.license);
                                                     this.appService.getChangeDetectorStream().next();
                                                 }
                                             });
    }
    
    private initPageJs() {
        
        let initValidationMaterial = function () {
            jQuery('.js-validation-material').validate({
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
                                                               'cashier_firstname': {
                                                                   required: true,
                                                                   minlength: 1
                                                               },
                                                               'cashier_lastname': {
                                                                   required: true,
                                                                   minlength: 1
                                                               },
                                                               'cashier_username': {
                                                                   required: true,
                                                                   minlength: 5
                                                               },
                                                               'cashier_email': {
                                                                   required: true,
                                                                   email: true
                                                               },
                                                               'cashier_products': {
                                                                   required: true,
                                                                   minlength: 1
                                                               },
                                                           },
                                                           messages: {
                                                               'cashier_username': {
                                                                   required: 'Please enter a username',
                                                                   minlength: 'Your username must consist of at least 5 characters'
                                                               },
                                                               'cashier_email': 'Please enter a valid email address',
                                                               'cashier_lastname': 'Please select a value!',
                                                               'cashier_firstname': 'Please select a value!',
                                                               'cashier_products': 'Please select a value!',
                                                           }
                                                       });
        };
        jQuery('.js-select2').select2().on('change', function () {
            jQuery(this).valid();
        });
        initValidationMaterial();
    }
    
}
