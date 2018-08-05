/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { AppState } from './app.service';

export const ROOT_SELECTOR = 'app';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: ROOT_SELECTOR,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span>AngularReactMaterial</span>
        <nav>
          <a [routerLink]=" ['./'] "
            routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
            <button mat-button color="primary">Index</button>
          </a>
          <a [routerLink]=" ['./home'] "
            routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
            <button mat-button color="primary">Home</button>
          </a>
          <a [routerLink]=" ['./detail'] "
            routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
            <button mat-button color="primary">Detail</button>
          </a>
          <a [routerLink]=" ['./barrel'] "
            routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
            <button mat-button color="primary">Barrel</button>
          </a>
          <a [routerLink]=" ['./about'] "
            routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
            <button mat-button color="primary">About</button>
          </a>
          <a *ngIf="showDevModule" [routerLink]=" ['./dev-module'] "
             routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
            <button mat-button color="primary">DevModule</button>
          </a>
        </nav>
      </mat-toolbar-row>
    </mat-toolbar>
    

    <main>
      <router-outlet></router-outlet>
    </main>

    <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

    <footer>
      <span>Angular Starter by <a [href]="twitter">@gdi2290</a></span>
      <div>
        <a [href]="url">
          <img [src]="tipe" width="25%">
        </a>
      </div>
    </footer>
  `
})
export class AppComponent implements OnInit {
  public name = 'Angular Starter';
  public tipe = 'assets/img/tipe.png';
  public twitter = 'https://twitter.com/gdi2290';
  public url = 'https://tipe.io';
  public showDevModule: boolean = environment.showDevModule;

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/**
 * Please review the https://github.com/AngularClass/angular-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
