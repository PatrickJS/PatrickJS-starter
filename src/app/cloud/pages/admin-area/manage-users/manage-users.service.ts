import {Injectable} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {MeteorObservable} from "meteor-rxjs";
import {Router} from "@angular/router";
import {Http, URLSearchParams, Headers, RequestOptions} from "@angular/http";
import {RequestService} from "../../../../service/request";
import {Observable} from "rxjs";

@Injectable()
export class ManageUsersService {
  viewState: any = {
    headerText: ""
  };
  viewData: any  = {};

  constructor(protected toast: ToastsManager,
              protected router: Router,
              private http: Http,
              private requestService: RequestService) { }

  createUser(data): Promise<any> {
    return new Promise((resolve, reject) => {
      MeteorObservable.call("user.create_user", data).subscribe(res => {
        resolve();
      }, (err) => {
        console.log(err);
        this.toast.error(err.reason, err.error);
      });
    });
  }

  editUser(data): Promise<any> {
    return new Promise((resolve, reject) => {
      MeteorObservable.call("user.edit_user", data).subscribe(res => {
        resolve();
      }, (err) => {
        this.toast.error(err.reason, err.error);
      });
    });
  }
  removeUser(data: any){
    return new Promise<void>((resolve, reject) => {
      MeteorObservable.call("user.remove_user", data).subscribe((res) => {
        this.toast.success("Remove User Successfully");
        resolve();
      }, (err) => {
        this.toast.error(err.reason, err.error);
        return reject(err);
      });
    });
  }

  updatePermission(data: any){
    return new Promise<void>((resolve, reject) => {
      MeteorObservable.call("license.remove_user", data).subscribe((res) => {
        this.toast.success("Remove User Successfully");
        resolve();
      }, (err) => {
        this.toast.error(err.reason, err.error);
        return reject(err);
      });
    });
  }

}
