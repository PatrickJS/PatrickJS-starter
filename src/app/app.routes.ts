import {DashboardComponent} from "./cloud/pages/dashboard/dashboard";
import {ManageLicensesComponent} from "./cloud/pages/admin-area/manage-licenses";
import {ManageLicensesGridComponent} from "./cloud/pages/admin-area/manage-licenses/grid";
import {LicenseFormComponent} from "./cloud/pages/admin-area/manage-licenses/form";
import {ManageProductsComponent} from "./cloud/pages/admin-area/manage-products";
import {ManageProductsGridComponent} from "./cloud/pages/admin-area/manage-products/grid";
import {ManageUsersComponent} from "./cloud/pages/admin-area/manage-users";
import {ManageUsersGridComponent} from "./cloud/pages/admin-area/manage-users/grid";
import {Routes} from "@angular/router";
import {ContainerComponent} from "./cloud/cloud-container/container";
import {PageNotFoundComponent} from "./cloud/pages/404/not-found";
import {AuthenticateGuard} from "./cloud/services/router-guard/authenticate";
import {SignInComponent} from "./cloud/pages/auth/signin";
import {SignUpComponent} from "./cloud/pages/auth/signup";
import {ResetPasswordComponent} from "./cloud/pages/auth/reset";
import {LockAccountComponent} from "./cloud/pages/auth/lock";
import {UserProfileComponent} from "./cloud/pages/profile/profile";
import {ManageShopComponent} from "./cloud/pages/manage-shop/manage-shop";
import {CashierGridComponent} from "./cloud/pages/manage-shop/children/cashier-grid";
import {ShopRolesComponent} from "./cloud/pages/manage-shop/children/shop-roles";
import {BillingPricingComponent} from "./cloud/pages/billing-pricing/billing-pricing";
import {CloudPricingComponent} from "./cloud/pages/billing-pricing/children/pricing";
import {CloudBillingComponent} from "./cloud/pages/billing-pricing/children/billing";
import {AssignLicenseComponent} from "./cloud/pages/admin-area/manage-licenses/assign";
import {ProductFormComponent} from "./cloud/pages/admin-area/manage-products/form";
import {CreateCashierComponent} from "./cloud/pages/manage-shop/children/create-cashier";
import {ManagePricingsComponent} from "./cloud/pages/admin-area/manage-pricings";
import {ManagePricingsGridComponent} from "./cloud/pages/admin-area/manage-pricings/grid";
import {PricingFormComponent} from "./cloud/pages/admin-area/manage-pricings/form";
import {UserFormComponent} from "./cloud/pages/admin-area/manage-users/form";
import {VerifyEmailComponent} from "./cloud/pages/auth/verify";

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

      /* ------------------------ Admin Area ------------------------ */
      {
        path     : 'licenses',
        component: ManageLicensesComponent,
        children : [
          {path: '', component: ManageLicensesGridComponent},
          {path: 'grid', component: ManageLicensesGridComponent},
          {path: 'add', component: LicenseFormComponent},
          {path: 'edit/:id', component: LicenseFormComponent},
          {path: 'assign', component: AssignLicenseComponent}
        ]
      },
      {
        path     : 'products',
        component: ManageProductsComponent,
        children : [
          {path: '', component: ManageProductsGridComponent},
          {path: 'grid', component: ManageProductsGridComponent},
          {path: 'create', component: ProductFormComponent},
          {path: ':id', component: ProductFormComponent}
        ]
      },
      {
        path     : 'pricings',
        component: ManagePricingsComponent,
        children : [
          {path: '', component: ManagePricingsGridComponent},
          {path: 'grid', component: ManagePricingsGridComponent},
          {path: 'create', component: PricingFormComponent},
          {path: 'edit/:id', component: PricingFormComponent}
        ]
      },
      {
        path     : 'users',
        component: ManageUsersComponent,
        children : [
          {path: '', component: ManageUsersGridComponent},
          {path: 'grid', component: ManageUsersGridComponent},
          {path: 'create', component: UserFormComponent},
          {path: 'edit/:id', component: UserFormComponent},
        ]
      },

      /* ------------------------ User Area ------------------------ */
      {
        path     : 'manage-shop',
        component: ManageShopComponent,
        children : [
          {path: '', component: CashierGridComponent},
          {path: 'cashiers', component: CashierGridComponent},
          {path: 'roles', component: ShopRolesComponent},
          {path: 'create-cashier', component: CreateCashierComponent}
        ]
      },
      {
        path     : 'billing-pricing',
        component: BillingPricingComponent,
        children : [
          {path: '', component: CloudPricingComponent},
          {path: 'pricing', component: CloudPricingComponent},
          {path: 'billing', component: CloudBillingComponent}
        ]
      }
    ]
  },
  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'reset-password/:token', component: ResetPasswordComponent},
  {path: 'verify-email/:token', component: VerifyEmailComponent},
  {path: 'lock-account', component: LockAccountComponent},
  {path: '**', component: PageNotFoundComponent}
];
