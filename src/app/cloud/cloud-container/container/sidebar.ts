import {
  Component,
  OnInit
} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/ddp/auth.service";

@Component({
             selector   : 'z-sidebar',
             templateUrl: 'sidebar.html'
           })
export class SideBarComponent implements OnInit {
  protected _canAccessAdmin: boolean;
  
  constructor(protected authService: AuthService,
              protected router: Router) { }
  
  ngOnInit() {
    this.authService.canAccessAdmin().then((d) => {
      this._canAccessAdmin = d;
      setTimeout(() => { OneUI['init']('uiNav');}, 500);
    });
  }
  
}
