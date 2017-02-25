import {AppComponent} from "./app.component";
import {ContainerComponent} from "./cloud/pages/cloud-container/container";
import {DashboardComponent} from "./cloud/pages/dashboard/dashboard";
import {AdminAreaComponent} from "./cloud/pages/admin-area/admin-area";
import {ManageLicensesComponent} from "./cloud/pages/admin-area/manage-licenses";
import {ManageLicensesGridComponent} from "./cloud/pages/admin-area/manage-licenses/grid";
import {ManageProductsComponent} from "./cloud/pages/admin-area/manage-products";
import {ManageProductsGridComponent} from "./cloud/pages/admin-area/manage-products/grid";

export const ROUTES: any = [
  {name: 'app', url: '/app', component: AppComponent},
  {name: 'app.cloud', url: '/cloud', component: ContainerComponent, abstract: true},
  {name: 'app.cloud.dashboard', url: '/dashboard', component: DashboardComponent},
  
  {name: 'app.cloud.admin-area', url: '/admin-area', component: AdminAreaComponent, abstract: true},
  {name: 'app.cloud.admin-area.manage-licenses', url: '/manage-licenses', component: ManageLicensesComponent, abstract: true},
  {name: 'app.cloud.admin-area.manage-licenses.grid', url: '/grid', component: ManageLicensesGridComponent},
  {name: 'app.cloud.admin-area.manage-products', url: '/manage-products', component: ManageProductsComponent, abstract: true},
  {name: 'app.cloud.admin-area.manage-products.grid', url: '/grid', component: ManageProductsGridComponent},
];
