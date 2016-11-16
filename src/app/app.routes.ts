import { Routes } from '@angular/router';
import { HomeComponent } from './home';
// import { AboutComponent } from './about';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  // make sure you match the component type string to the require in asyncRoutes
  // { path: 'about', component: AboutComponent },
  {
    path: 'about', loadChildren: () => System.import('./about').then((comp: any) => {
      console.log(comp);
      return comp.default;
    })
    ,
  },
];
