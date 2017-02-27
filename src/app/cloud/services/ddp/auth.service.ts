import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  protected user: any;
  
  // store the URL so we can redirect after logging in
  public redirectUrl: string;
  
  constructor() { }
  
  getCurrentUser() {
    if (typeof this.user == "undefined") {
      this.user = Meteor.user();
    }
    return this.user;
  }
  
}
