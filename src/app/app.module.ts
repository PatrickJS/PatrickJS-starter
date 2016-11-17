import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, PreloadAllModules, Router, NavigationEnd } from '@angular/router';

/** Angular Guard for module routes */
import { AuthenticateGuard } from './shared/services/auth.service';

/** Angular Modules commented. Use in case of need */

//import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';


/** Platform and Environment providers/directives/pipes*/
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

/** App is our top level component */
import { CoreComponent } from './core';

import { HomeModule } from './modules/home';

import { NoContentComponent } from './modules/no-content';

/** `AppModule` is the main entry point into Angular2's bootstraping process */
@NgModule({
  bootstrap: [ CoreComponent ],
  declarations: [
    CoreComponent,
    NoContentComponent
  ],
  /** import Angular's modules and specify the lazyLoad modules preload strategy */
  imports: [
    BrowserModule,
    HomeModule,
//  FormsModule,
//  HttpModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true
    })
  ],
  /** expose our Services and Providers into Angular's dependency injection*/
  providers: [
    ENV_PROVIDERS,
    AuthenticateGuard
  ]
  // entryComponents: [
  //   HomeComponent
  // ]
})

export class AppModule {
  constructor(public appRef: ApplicationRef, private router: Router) {

    if ('production' !== ENV) {
      router.events.subscribe((navigationEvent) => {
        if (navigationEvent instanceof NavigationEnd) {
          console.debug('navigation to: ', navigationEvent);
        }
      })
    }
  }
}
