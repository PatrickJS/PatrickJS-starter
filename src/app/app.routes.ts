import {AppComponent} from "./app.component";
import {ContainerComponent} from "./cloud/pages/cloud-container/container";
import {DashboardComponent} from "./cloud/pages/dashboard/dashboard";

export const ROUTES: any = [
  {name: 'app', url: '/app', component: AppComponent},
  {name: 'app.cloud', url: '/cloud', component: ContainerComponent, abstract: true},
  {name: 'app.cloud.dashboard', url: '/dashboard', component: DashboardComponent},
];
