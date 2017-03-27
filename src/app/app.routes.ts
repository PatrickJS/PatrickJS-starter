import {DashboardComponent} from "./cloud/pages/dashboard/dashboard";
import {AdminAreaComponent} from "./cloud/pages/admin-area/admin-area";
import {AuthComponent} from "./cloud/pages/auth/auth.component";
import {ManageLicensesComponent} from "./cloud/pages/admin-area/manage-licenses";
import {ManageLicensesGridComponent} from "./cloud/pages/admin-area/manage-licenses/grid";
import {ManageProductsComponent} from "./cloud/pages/admin-area/manage-products";
import {ProductComponent} from "./cloud/pages/admin-area/manage-products/product";
import {ManageProductsGridComponent} from "./cloud/pages/admin-area/manage-products/grid";
import {ManagePricingComponent} from "./cloud/pages/admin-area/manage-pricing";
import {ManagePricingGridComponent} from "./cloud/pages/admin-area/manage-pricing/grid";
import {Routes} from "@angular/router";
import {ContainerComponent} from "./cloud/cloud-container/container";
import {PageNotFoundComponent} from "./cloud/pages/404/not-found";
import {AuthenticateGuard} from "./cloud/services/router-guard/authenticate";
import {SignInComponent} from "./cloud/pages/auth/signin";
import {SignUpComponent} from "./cloud/pages/auth/signup";
import {ResetPasswordComponent} from "./cloud/pages/auth/reset";
import {LockAccountComponent} from "./cloud/pages/auth/lock";
import {UserProfileComponent} from "./cloud/pages/profile/profile";

export const ROUTES: Routes = [
  {
    path      : '',
    redirectTo: '/cloud',
    pathMatch : 'full'
  },

  {
    path       : 'cloud',
    component  : ContainerComponent,
    canActivate: [AuthenticateGuard],
    children   : [
      {
        path     : '',
        component: DashboardComponent
      },
      {
        path     : 'profile',
        component: UserProfileComponent
      },
      {
        path     : 'licenses',
        component: ManageLicensesComponent,
        children : [
          {path: '', component: ManageLicensesGridComponent}
        ]
      },
      {
        path     : 'products',
        component: ManageProductsComponent,
        children : [
          {path: '', component: ManageProductsGridComponent}
        ]
      },
      {
        path     : 'products/:id',
        component: ProductComponent,
      },
      {
        path     : 'pricing',
        component: ManagePricingComponent,
        children : [
          {path: '', component: ManagePricingGridComponent}
        ]
      }
    ]
  },
  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'lock-account', component: LockAccountComponent},
  {path: '**', component: PageNotFoundComponent}
];
