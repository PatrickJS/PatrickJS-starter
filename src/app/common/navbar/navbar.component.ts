import { Component } from '@angular/core';
import { GlobalState } from '../../global-state.service';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  public sidenavOpen: boolean = true;
  public navbarTitle: string = '';

  constructor(public _state: GlobalState) {
    this._state.subscribe('navbar.title', (newtitle) => {
      this.navbarTitle = newtitle;
    });

  }

  public toggleSidenav(sidenavId) {
    this.sidenavOpen = !this.sidenavOpen;
    this._state.notifyDataChanged('sidebar.toggle',
      {}
    );

  }

}
