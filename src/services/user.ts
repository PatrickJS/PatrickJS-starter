import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  private loggedIn = false;

  constructor ( private http: Http ) {
    this.loggedIn = !!localStorage.getItem( 'auth_token' );
  }

  login () {
    var self = this;
    return this.http.get( 'public/login.json' )
      .map(resp => resp.json())
      .map((resp) => {
        localStorage.setItem( 'auth_token', resp.token );
        this.loggedIn = true;
        return true;
      })
    ;
  }

  logout () {
    localStorage.removeItem( 'auth_token' );
    this.loggedIn = false;
  }

  isLoggedIn () {
    return this.loggedIn;
  }
}