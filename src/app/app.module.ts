import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import {ENV_PROVIDERS} from './environment';
// App is our top level component
import {AppComponent} from './app.component';
import {AppState, InternalStateType} from './app.service';

import {UIRouterModule} from 'ui-router-ng2';
import {ROUTES} from "./app.routes";
import {ContainerComponent} from "./cloud/pages/cloud-container/container";
import {SideOverlayComponent} from "./cloud/pages/cloud-container/container/side-overlay";
import {SideBarComponent} from "./cloud/pages/cloud-container/container/sidebar";
import {HeaderComponent} from "./cloud/pages/cloud-container/container/header";
import {FooterComponent} from "./cloud/pages/cloud-container/container/footer";
import {DashboardComponent} from "./cloud/pages/dashboard/dashboard";
import {ProductsComponent} from "./cloud/pages/products/products";

// Application wide providers
const APP_PROVIDERS = [
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
            bootstrap: [AppComponent],
            declarations: [
              AppComponent,
              ContainerComponent,
              SideOverlayComponent,
              SideBarComponent,
              HeaderComponent,
              FooterComponent,
              ProductsComponent,
              DashboardComponent
            ],
            imports: [ // import Angular's modules
              BrowserModule,
              FormsModule,
              HttpModule,
              UIRouterModule.forRoot({states: ROUTES, useHash: true})
            ],
            providers: [ // expose our Services and Providers into Angular's dependency injection
              ENV_PROVIDERS,
              APP_PROVIDERS
            ]
          })
export class AppModule {
  
  constructor(public appRef: ApplicationRef,
              public appState: AppState) {}
  
  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }
    
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }
  
  public hmrOnDestroy(store: StoreType) {
    const cmpLocation        = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state              = this.appState._state;
    store.state              = state;
    // recreate root elements
    store.disposeOldHosts    = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }
  
  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
  
}
