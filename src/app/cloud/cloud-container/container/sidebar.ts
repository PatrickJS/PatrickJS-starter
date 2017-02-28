import {
  Component,
  OnInit
} from '@angular/core';
import {Router} from "@angular/router";

@Component({
             selector   : 'z-sidebar',
             templateUrl: 'sidebar.html'
           })
export class SideBarComponent implements OnInit {
  constructor(
    protected router: Router) { }
  
  ngOnInit() {
  }
  
}
