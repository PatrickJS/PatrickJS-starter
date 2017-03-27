/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { GlobalState } from './global-state.service';
import { MdSidenav } from '@angular/material';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('leftNav')
  public leftNav: MdSidenav;

  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor(public _state: GlobalState) {

    this._state.subscribe('sidebar.toggle', () => {
      this.leftNav.toggle();
    });

  }

  public ngOnInit() {
    console.log('Initial App State');
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
