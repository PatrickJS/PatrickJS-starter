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
  constructor(protected authService: AuthService,
              protected router: Router) { }
  
  ngOnInit() {
  }
  
}
