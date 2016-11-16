import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { routes } from './app.routes';


// Import material design module
import { MaterialModule } from '@angular/material';
import { MdSidenavModule } from '@angular/material';

// Import the root component
import { AppComponent } from './app';
import { HomeComponent } from './home';

if ('production' === ENV) {
    enableProdMode();
}

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        MaterialModule.forRoot()
    ],
    declarations: [
        HomeComponent,
        // AboutComponent,
        AppComponent,
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private router: Router) {
    router.events.subscribe(function () {
        console.log(arguments);
    });
  }
}
