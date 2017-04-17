import {Injectable} from '@angular/core';
import {MeteorObservable} from "meteor-rxjs";
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";
import {LicenseCollection} from "../../../services/ddp/collections/licenses";
import * as $q from 'q';

@Injectable()
export class ManageLicensesService {
  viewState: any = {
    headerText: ""
  };
  viewData: any  = {};

  constructor(protected toast: ToastsManager,
              protected router: Router,
              protected licenseCollection: LicenseCollection) { }

  createLicense(license: any): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      MeteorObservable.call("license.admin_create_license", license).subscribe((res) => {
        this.router.navigate(['cloud/licenses']);
        this.toast.success("Create License Successful");
        resolve();
      }, (err) => {
        this.toast.error(err.reason, err.error);
        return reject(err);
      });
    });
  }

  editLicense(license: any): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      MeteorObservable.call("license.edit_license", license).subscribe((res) => {
        this.router.navigate(['cloud/licenses/']);
        this.toast.success("Edit License Successfully");
        resolve();
      }, (err) => {
        this.toast.error(err.reason, err.error);
        return reject(err);
      });
    });
  }

  delete(licenseId: string): Promise<any> {
    let defer = $q.defer();
    MeteorObservable.call("license.delete", {id: licenseId}).subscribe(res => {
      this.toast.success("Remove License Successfully");
    }, (err) => {
      this.toast.error(err.reason, err.error);
      return $q.reject(err);
    });
    return <any>defer.promise;
  }
}
