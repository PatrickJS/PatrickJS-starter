/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [ require('@angular2-material/core/style/core.css') ],
  template: `

      <md-toolbar color="primary">
          <span>{{ name }}</span>
          <span class="fill"></span>
          <a md-button [routerLink]=" ['./'] ">
            Index
          </a>
          <a md-button [routerLink]=" ['./home'] ">
            Home
          </a>
          <a md-button [routerLink]=" ['./demo'] ">
            Material Demo
          </a>
          <a md-button [routerLink]=" ['./detail'] ">
            Detail
          </a>
          <a md-button [routerLink]=" ['./about'] ">
            About
          </a>
      </md-toolbar>
      <router-outlet></router-outlet>





  `
})
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
