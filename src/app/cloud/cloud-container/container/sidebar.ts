import {
  Component,
  OnInit
} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/ddp/auth.service";
import {AppService} from "../../../app.service";
import {AbstractRxComponent} from "../../../code/angular/AbstractRxComponent";
import {Observable} from "rxjs";
import {LicenseCollection} from "../../services/ddp/collections/licenses";
import {ToastsManager} from "ng2-toastr";

@Component({
             selector   : 'z-sidebar',
             templateUrl: 'sidebar.html'
           })
export class SideBarComponent extends AbstractRxComponent implements OnInit {
  protected data = {
    canAccessAdmin: false,
    isUser        : false
  };
  protected license: any = {};
  protected roles: any;
  protected role_code: string;
  
  constructor(protected authService: AuthService,
              protected appService: AppService,
              protected router: Router,
              protected licenseCollection: LicenseCollection,
              protected toast: ToastsManager) {
    super();
  }
  
  ngOnInit() {
    this.authService
        .getUserStateObservable()
        .subscribe((data: any) => {
          if (data) {
            this.data.canAccessAdmin = data['canAccessAdmin'];
            this.data.isUser         = data['isUser'];

            if (this.data.isUser){
              this._subscription['licenses'] =
                Observable.combineLatest(this.licenseCollection.getCollectionObservable())
                          .subscribe(([licenseCollection]) => {
                            let licenses = licenseCollection.collection.find().fetch();
                            if (_.size(licenses) == 1) {
                              this.license = licenses[0];
                              if (this.license.hasOwnProperty('has_roles')) {
                                this.roles = this.license.has_roles;
                                if (this.roles.length > 0)
                                  this.role_code = this.roles[0]['code']
                                else{
                                  this.router.navigate(['/cloud/roles']);
                                  this.toast.info('You need create role');
                                }
                              }
                            }
                          });
            }
            setTimeout(() => { OneUI['init']('uiNav');}, 1000);
          }
        });
  }
  
}
