import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../ddp/auth.service";

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(protected authService: AuthService,
              protected router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      if(currentUser.hasOwnProperty('profile') && currentUser.profile.hasOwnProperty('is_disabled') && currentUser.profile.is_disabled){
        Meteor.logout();
        this.router.navigate(['']);
      }
      if(!currentUser.emails[0].verified){
        alert('Please verify your email');
        this.router.navigate(['/verify_email']);
        return false;
      }
      return true;
    } else {
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
