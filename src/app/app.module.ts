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
  AppService
} from './app.service';

import {ROUTES} from "./app.routes";
import {DashboardComponent} from "./cloud/pages/dashboard/dashboard";
import {ProductsComponent} from "./cloud/pages/products/products";
import {ManageLicensesComponent} from "./cloud/pages/admin-area/manage-licenses";
import {ManageLicensesGridComponent} from "./cloud/pages/admin-area/manage-licenses/grid";
import {ManageProductsComponent} from "./cloud/pages/admin-area/manage-products";
import {ManageProductsGridComponent} from "./cloud/pages/admin-area/manage-products/grid";
import {ManageProductsService} from "./cloud/pages/admin-area/manage-products/manage-products.service";
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
import {UserCollection} from "./cloud/services/ddp/collections/users";
import {CashierGridComponent} from "./cloud/pages/manage-shop/children/cashier-grid";
import {ManageShopComponent} from "./cloud/pages/manage-shop/manage-shop";
import {ShopRolesComponent} from "./cloud/pages/manage-shop/children/shop-roles";
import {LicenseCollection} from "./cloud/services/ddp/collections/licenses";
import {BillingPricingComponent} from "./cloud/pages/billing-pricing/billing-pricing";
import {CloudBillingComponent} from "./cloud/pages/billing-pricing/children/billing";
import {CloudPricingComponent} from "./cloud/pages/billing-pricing/children/pricing";
import {ManageUsersComponent} from "./cloud/pages/admin-area/manage-users";
import {ManageUsersGridComponent} from "./cloud/pages/admin-area/manage-users/grid";
import {CreateLicenseComponent} from "./cloud/pages/admin-area/manage-licenses/create";
import {CreateProductComponent} from "./cloud/pages/admin-area/manage-products/create";
import {AssignLicenseComponent} from "./cloud/pages/admin-area/manage-licenses/assign";
import {EditProductComponent} from "./cloud/pages/admin-area/manage-products/edit";
import {CreateCashierComponent} from "./cloud/pages/manage-shop/children/create-cashier";

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
              AssignLicenseComponent,
              ManageProductsComponent,
              ManageProductsGridComponent,
              ManageUsersComponent,
              ManageUsersGridComponent,
              SignInComponent,
              SignUpComponent,
              ResetPasswordComponent,
              LockAccountComponent,
              UserProfileComponent,
              ManageShopComponent,
              CashierGridComponent,
              ShopRolesComponent,
              BillingPricingComponent,
              CloudBillingComponent,
              CloudPricingComponent,
              CreateLicenseComponent,
              CreateProductComponent,
              EditProductComponent,
              CreateCashierComponent
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
              AppService,
              ProductCollection,
              UserCollection,
              LicenseCollection,
              AuthService,
              AuthenticateGuard,
              ManageProductsService
            ]
          })
export class AppModule {
}
