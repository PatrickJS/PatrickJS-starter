import {AppComponent} from "./app.component";
import {CloudContainerComponent} from "./cloud/pages/cloud-container";

export const ROUTES: any = [
  {name: 'app', url: '/app', component: AppComponent},
  {name: 'app.cloud', url: '/cloud', component: CloudContainerComponent},
];
