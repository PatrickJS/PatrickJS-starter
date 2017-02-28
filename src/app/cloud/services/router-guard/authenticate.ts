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
    if (this.authService.getCurrentUser()) {
      return true;
    } else {
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
