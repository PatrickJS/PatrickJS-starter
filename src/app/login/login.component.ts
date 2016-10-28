import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})

export class LoginComponent {

  private isLogged = false;

  constructor( private userService: UserService, private router: Router ) {
    this.isLogged = userService.isLoggedIn();
  }

  submitLogin ( ) {
    this.userService.login().subscribe(() => {
      this.router.navigate( [''] );
    });
  }
  submitLogout ( ) {
    this.userService.logout();
    this.isLogged = false;
  }
}
