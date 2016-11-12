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
  styleUrls: [
    './app.component.css',
    './theme.scss'
  ],
  template: `
  <md-sidenav-layout class="webpack-starter" [class.m2app-dark]="isDarkTheme">
    <md-toolbar color="primary">
      <button md-icon-button [md-menu-trigger-for]="menu">
        <md-icon>more_vert</md-icon>
      </button>
      <md-menu #menu="mdMenu">
        <button md-menu-item [routerLink]=" ['./'] "> Index </button>
        <button md-menu-item [routerLink]=" ['./home'] ">
          <md-icon> home </md-icon>
          <span> Home </span>
        </button>
        <button md-menu-item disabled> Disabled option </button>
      </md-menu>
      <span class="right">
        <button md-button [routerLink]=" ['./'] ">
          Index
        </button>
        <button md-button [routerLink]=" ['./home'] ">
          Home
        </button>
        <button md-button [routerLink]=" ['./detail'] ">
          Detail
        </button>
        <button color="accent" md-raised-button [routerLink]=" ['./about'] ">
          About
        </button>
        <button md-raised-button color="warn" (click)="isDarkTheme = !isDarkTheme">TOGGLE THEME</button>
      </span>
    </md-toolbar>

    <main>
      <router-outlet></router-outlet>
    </main>

    <md-card><pre class="app-state">this.appState.state = {{ appState.state | json }}</pre></md-card>

    <footer>
      <span>WebPack Angular 2 Starter by <a [href]="url">@AngularClass</a></span>
      <div>
        <a [href]="url">
          <img [src]="angularclassLogo" width="25%">
        </a>
      </div>
    </footer>
    </md-sidenav-layout>
  `
})
export class AppComponent {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  isDarkTheme: boolean = false;

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
