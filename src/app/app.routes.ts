import {DashboardComponent} from "./cloud/pages/dashboard/dashboard";
import {AdminAreaComponent} from "./cloud/pages/admin-area/admin-area";
import {ManageLicensesComponent} from "./cloud/pages/admin-area/manage-licenses";
import {ManageLicensesGridComponent} from "./cloud/pages/admin-area/manage-licenses/grid";
import {ManageProductsComponent} from "./cloud/pages/admin-area/manage-products";
import {ManageProductsGridComponent} from "./cloud/pages/admin-area/manage-products/grid";
import {Routes} from "@angular/router";
import {ContainerComponent} from "./cloud/cloud-container/container";
import {PageNotFoundComponent} from "./cloud/pages/404/not-found";

export const ROUTES: Routes = [
  {
    path      : '',
    redirectTo: '/cloud',
    pathMatch : 'full'
  },
  
  {
    path     : 'cloud',
    component: ContainerComponent,
    children : [
      {
        path     : '',
        component: DashboardComponent
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
      }
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];
