import {Injectable} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  protected user: any;
  protected isLoading: boolean = false;
  
  // store the URL so we can redirect after logging in
  public redirectUrl: string;
  
  constructor(protected toast: ToastsManager, protected router: Router) { }
  
  getCurrentUser(forceUpdate: boolean = false) {
    if (typeof this.user == "undefined" || forceUpdate) {
      this.user = Meteor.user();
    }
    return this.user;
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
        resolve();
      });
    });
  }
  
}
