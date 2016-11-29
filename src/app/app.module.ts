import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, PreloadAllModules, Router, NavigationEnd } from '@angular/router';

/** Angular Guard for module routes */
import { AuthenticateGuard } from './shared/services/auth.service';

/** Angular Modules commented. Use in case you need it */

//import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';

// Import material design module
import { MaterialModule } from '@angular/material';

/** Platform and Environment providers/directives/pipes*/
import { ENV_PROVIDERS } from './app.environment';
import { ROUTES } from './app.routes';

/** App is our top level component */
import { ShellComponent, ShellModule } from './shell';
import { NoContentComponent } from './shared/components/no-content/no-content.component';


/** `AppModule` is the main entry point into Angular2's bootstraping process */
@NgModule({
  bootstrap: [ ShellComponent ],
  declarations: [
    NoContentComponent
  ],
  /** import Angular's modules and specify the lazyLoad modules preload strategy */
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    ShellModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true
      //,preloadingStrategy: PreloadAllModules
    })
  ],
  /** expose our Services and Providers into Angular's dependency injection*/
  providers: [
    ENV_PROVIDERS,
    AuthenticateGuard
  ]
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
