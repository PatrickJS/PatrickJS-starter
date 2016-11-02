import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { XLargeDirective } from './home/x-large';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NoContentComponent,
    XLargeDirective,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
  ],
  entryComponents: [
    HomeComponent,
    AboutComponent,
  ],
})
export class AppModule {
  constructor(
    public appRef: ApplicationRef,
    public appState: AppState,
  ) { }

}
