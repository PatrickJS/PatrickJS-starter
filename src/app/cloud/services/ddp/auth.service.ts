import {Injectable} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";
import {MeteorObservable} from "meteor-rxjs";
import {Observable} from "rxjs";
import * as _ from "lodash";

@Injectable()
export class AuthService {
  protected user: any;
  protected isLoading: boolean = false;
  protected _data              = {};
  
  // store the URL so we can redirect after logging in
  public redirectUrl: string;
  
  protected _userRoles: Observable<string[]>;
  
  constructor(protected toast: ToastsManager,
              protected router: Router) { }
  
  getCurrentUser(forceUpdate: boolean = false) {
    if (!this.user || forceUpdate) {
      this.user = Meteor.user();
    }
    return this.user;
  }
  
  getUserRole(): Observable<string[]> {
    if (typeof this._userRoles == "undefined") {
      this._userRoles = new Observable(ob => {
        MeteorObservable.call("user.get_roles").subscribe(data => {
          ob.next(data);
        });
      }).startWith([]);
    }
    return this._userRoles;
  }
  
  signUp(user: any) {
    return new Promise<void>((resolve, reject) => {
      this.isLoading = true;
      Accounts.createUser({
                            username: user.username,
                            email   : user.email,
                            password: user.password,
                            // profile : {
                            //   first_name: user.first_name,
                            //   last_name : user.last_name
                            // }
                          }, (err, res) => {
        this.isLoading = false;
        if (err && err.error) {
          this.toast.error(err.reason, err.error);
          return reject(err);
        } else {
          if (this.redirectUrl)
            this.router.navigate([this.redirectUrl]);
          else
            this.router.navigate(['']);
          resolve();
        }
      });
    });
  }
  
  signIn(user: any) {
    return new Promise<void>((resolve, reject) => {
      Meteor.loginWithPassword(user.username, user.password, (e: Error) => {
        this.isLoading = false;
        if (e && e['reason']) {
          this.toast.error(e['reason'], e['error']);
          return reject(e);
        }
        this.getCurrentUser(true);
        this.router.navigate(['']);
        resolve();
      });
    });
  }
  
  signOut() {
    return new Promise<void>((resolve, reject) => {
      Meteor.logout((e: Error) => {
        this.isLoading = false;
        if (e && e['reason']) {
          this.toast.error(e['reason'], e['error']);
          return reject(e);
        }
        this.getCurrentUser(true);
        this.router.navigate(['/signin']);
        resolve();
      });
    });
  }
  
  canAccessAdmin() {
    if (!this._data.hasOwnProperty('canAccessAdmin')) {
      this.getUserRole().subscribe(roles => {
        this._data['canAccessAdmin'] = _.size(_.intersection(roles, ['admin', 'sales', "super_admin"])) > 0;
      });
    }
    return this._data['canAccessAdmin'];
  }
}
