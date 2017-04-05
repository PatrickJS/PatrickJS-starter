import {Injectable} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {MeteorObservable} from "meteor-rxjs";
import {Router} from "@angular/router";
import {Http, Response, URLSearchParams, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class ManageUsersService {
  viewState: any = {
    headerText: ""
  };
  viewData: any  = {};

  api_magento2 = "http://mage2.dev";

  constructor(protected toast: ToastsManager,
              protected router: Router,
              private http: Http) { }

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

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  updatePermission(data: any): Observable<any>{
    return this.http.post(this.api_magento2 + "/xrest/v1/xretail/permission", data)
      .catch(this.handleError);
  }

  getAllRoles(): Observable<any>{
    return this.http.get(this.api_magento2 + "/xrest/v1/xretail/role")
      .map((data) => {
        return JSON.parse(data._body).items;
      }).catch(this.handleError);
  }

  getAllPermissions(role_id): Observable<any>{
    let params: URLSearchParams = new URLSearchParams();
    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

    params.set('role_id', role_id);
    options.search = params;
    return this.http.get(this.api_magento2 + "/xrest/v1/xretail/permission", options)
               .map((data) => {
                 return JSON.parse(data._body).items;
               }).catch(this.handleError);
  }
}
