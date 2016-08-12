import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './platform/browser/angular2-material2';
import { App, routes, AppState, APP_ROUTE_PROVIDER } from './app';
import { Home } from './app/home';
import { About } from './app/about';
import { NoContent } from './app/no-content';
import { Detail } from './app/+detail';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule,
  ],
  providers: [
    AppState,
    APP_ROUTE_PROVIDER
  ],
  declarations: [
    App,
    Home,
    Detail,
    About,
    NoContent
  ],
  entryComponents: [
    App
  ],
})
export class AppModule {
  constructor(private _appRef: ApplicationRef) { }

  ngDoBootstrap() {
    this._appRef.bootstrap(App);
  }
}
