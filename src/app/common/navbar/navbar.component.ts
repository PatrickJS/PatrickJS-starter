import { Component } from '@angular/core';
import { GlobalState } from '../../global-state.service';
import { MdSidenav } from '@angular/material';

import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  public sidenavOpen: boolean = true;
  public navbarTitle: string = '';
  public breadcrumb: any[];
  private newBreadcrumb: any[];

  constructor(
    public _state: GlobalState,
    private router: Router) {
    this._state.subscribe('navbar.title', (newtitle) => {
      this.navbarTitle = newtitle;
    });
    this._state.subscribe('breadcrumb', (newBreadcrumb) => {
      this.newBreadcrumb = newBreadcrumb;
    });
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.newBreadcrumb.length === 0) {
          this.breadcrumb = [];
        } else {
          this.breadcrumb = this.newBreadcrumb;
        }
      }
      if (val instanceof NavigationStart) {
        this.newBreadcrumb = [];
      }
    });

  }

  public toggleSidenav(sidenavId) {
    this.sidenavOpen = !this.sidenavOpen;
    this._state.notifyDataChanged('sidebar.toggle',
      {}
    );

  }

}
