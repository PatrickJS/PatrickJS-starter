import {Injectable} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";
import * as _ from "lodash";
import {ReplaySubject, Observable} from "rxjs";
import {UserCollection} from "./collections/users";
import {MeteorObservable} from "meteor-rxjs";
import {Accounts} from "meteor/accounts-base"

@Injectable()
export class AuthService {
  protected user: any;
  protected isLoading: boolean = false;
  protected _data              = {};
  
  // store the URL so we can redirect after logging in
  public redirectUrl: string;
  
  protected userStateObservable = new ReplaySubject(1);
  
  constructor(protected toast: ToastsManager,
              protected router: Router,
              protected userCollection: UserCollection) {
    this.initUserSateObservable();
  }
  
  private initUserSateObservable() {
    this.userCollection
        .getCollectionObservable()
        .filter(() => this.getCurrentUser(true))
        .subscribe((collection) => {
          MeteorObservable.autorun().subscribe(() => {
            let user = collection.findOne({_id: this.getCurrentUser()['_id']});
            if (user) {
              this.userStateObservable
                  .next({
                          canAccessAdmin: _.size(_.intersection(user['roles']['cloud_group'], ['admin', 'sales', "super_admin"])) > 0,
                          isUser: _.size(_.intersection(user['roles']['cloud_group'], ['user'])) > 0
                        });
            } else {
              this.userStateObservable
                  .next({
                          canAccessAdmin: false,
                          isUser: false
                        });
            }
          });
        });
  }
  
  getCurrentUser(forceUpdate: boolean = false) {
    if (!this.user || forceUpdate) {
      this.user = Meteor.user();
    }
    return this.user;
  }
  
  signUp(user: any) {
    return new Promise<void>((resolve, reject) => {
      this.isLoading = true;
      Accounts.createUser({
                            username: user.username,
                            email: user.email,
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
          Meteor.call('send_verification', (error, response) => {
            if (err && err.error) {
              this.toast.error(err.reason, err.error);
              return reject(err);
            }else{
              //Meteor.logout();
              if (this.redirectUrl)
                this.router.navigate([this.redirectUrl]);
              else
                this.router.navigate(['']);
              resolve();
            }
          });

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
        /*if(!this.getCurrentUser().emails[0].verified){
          alert('Please verified email before sign in');
          Meteor.logout();
          return;
        }*/
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
  
  getUserStateObservable(): Observable<any> {
    return this.userStateObservable.asObservable().share();
  }

  updateProfile(data) {
    return new Promise((resolve, reject) => {
      MeteorObservable.call("user.update_profile", data).subscribe(res => {
        resolve();
      }, (err) => {
        if (!err){
          resolve();
        }else{
          console.log(err);
          this.toast.error(err.reason, err.error);
        }
      });
    });
  }

  changePassword(data){
    return new Promise<void>((resolve, reject) => {
      if (data['confirm_new_password'].localeCompare(data['new_password'])){
        this.toast.error('Confirm new password must equal new password');
        return;
      }
      Accounts.changePassword(data['old_password'], data['new_password'], (err) => {
        if (err) {
          this.toast.error(err);
        }else{
          resolve();
        }
      });
    });
  }

  forgotPassword(data){
    return new Promise<void>((resolve, reject) => {
      Accounts.forgotPassword(data, (err) => {
        if (!err) {
          this.toast.info("A message was sent to your email");
          resolve();
        }else {
          this.toast.error(err);
        }
      });
    });
  }

  resetPassword(token, data){
    return new Promise<void>((resolve, reject) => {
      if (data['confirm_new_password'].localeCompare(data['new_password'])){
        this.toast.error('Confirm new password must equal new password');
        return;
      }
      Accounts.resetPassword(token, data['new_password'], (err) => {
        if (!err) {
          this.toast.success('Password reset successfully');
          resolve();
        } else {
          this.toast.error(err);
        }
      });
    });
  }

  verifyEmail(token){
    return new Promise<void>((resolve, reject) => {

      Accounts.verifyEmail(token, (err) => {
        if (!err) {
          resolve();
        } else {
          this.toast.error(err);
        }
      });
    });
  }

}
