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
import {
  AppState,
  InternalStateType
} from './app.service';

import {ROUTES} from "./app.routes";
import {DashboardComponent} from "./cloud/pages/dashboard/dashboard";
import {ProductsComponent} from "./cloud/pages/products/products";
import {ManageLicensesComponent} from "./cloud/pages/admin-area/manage-licenses";
import {ManageLicensesGridComponent} from "./cloud/pages/admin-area/manage-licenses/grid";
import {ManageProductsComponent} from "./cloud/pages/admin-area/manage-products";
import {ManageProductsGridComponent} from "./cloud/pages/admin-area/manage-products/grid";
import {ProductCollection} from "./cloud/services/ddp/collections/products";
import {RouterModule} from "@angular/router";
import {ToastModule} from "ng2-toastr";
import {ContainerComponent} from "./cloud/cloud-container/container";
import {HeaderComponent} from "./cloud/cloud-container/container/header";
import {FooterComponent} from "./cloud/cloud-container/container/footer";
import {SideBarComponent} from "./cloud/cloud-container/container/sidebar";
import {SideOverlayComponent} from "./cloud/cloud-container/container/side-overlay";
import {PageNotFoundComponent} from "./cloud/pages/404/not-found";
import {AngularHelperModule} from "./code/angular/index";
import {SignInComponent} from "./cloud/pages/auth/signin";
import {AuthService} from "./cloud/services/ddp/auth.service";
import {AuthenticateGuard} from "./cloud/services/router-guard/authenticate";
import {SignUpComponent} from "./cloud/pages/auth/signup";
import {ResetPasswordComponent} from "./cloud/pages/auth/reset";
import {LockAccountComponent} from "./cloud/pages/auth/lock";
import {UserProfileComponent} from "./cloud/pages/profile/profile";

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
            bootstrap   : [AppComponent],
            declarations: [
              AppComponent,
              PageNotFoundComponent,
              ContainerComponent,
              SideOverlayComponent,
              SideBarComponent,
              HeaderComponent,
              FooterComponent,
              ProductsComponent,
              DashboardComponent,
              ManageLicensesComponent,
              ManageLicensesGridComponent,
              ManageProductsComponent,
              ManageProductsGridComponent,
              SignInComponent,
              SignUpComponent,
              ResetPasswordComponent,
              LockAccountComponent,
              UserProfileComponent
            ],
            imports     : [ // import Angular's modules
              BrowserModule,
              FormsModule,
              HttpModule,
              AngularHelperModule,
              ToastModule.forRoot(),
              RouterModule.forRoot(ROUTES, {useHash: true})
            ],
            providers   : [ // expose our Services and Providers into Angular's dependency injection
              ENV_PROVIDERS,
              APP_PROVIDERS,
              ProductCollection,
              AuthService,
              AuthenticateGuard
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
