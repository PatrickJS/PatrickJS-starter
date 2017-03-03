import {
  Component,
  OnInit
} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/ddp/auth.service";
import {AppService} from "../../../app.service";

@Component({
             selector   : 'z-sidebar',
             templateUrl: 'sidebar.html'
           })
export class SideBarComponent implements OnInit {
  protected data = {
    canAccessAdmin: false,
    isUser        : false
  };
  
  constructor(protected authService: AuthService,
              protected appService: AppService,
              protected router: Router) { }
  
  ngOnInit() {
    this.authService
        .getUserStateObservable()
        .subscribe((data: any) => {
          if (data) {
            this.data.canAccessAdmin = data['canAccessAdmin'];
            this.data.isUser         = data['isUser'];
            setTimeout(() => { OneUI['init']('uiNav');}, 1000);
          }
        });
  }
  
}
