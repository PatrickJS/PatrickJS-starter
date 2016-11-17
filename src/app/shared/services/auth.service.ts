import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

@Injectable()
export class AuthenticateGuard implements CanActivate, CanLoad {

  constructor() {}

  /**
   * Define route activation policy
   * @returns {Boolean}
   */
  canActivate() {
    return true;
  };

  /**
   * Define lazy load policy
   * @returns {Boolean}
   */
  canLoad() {
    return new Promise((resolve,reject) => {
      return resolve(true);
    });
  };

}
