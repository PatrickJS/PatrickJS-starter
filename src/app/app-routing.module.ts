import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LoggedInGuard } from '../services/logged-in.guard';
import { UserService } from '../services/user';

import { LoginComponent } from './+login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authorized',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'authorized',
    loadChildren: './+authorized/authorized.module#AuthorizedModule',
    canActivate: [ LoggedInGuard ],
  },
];


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot( routes, { useHash: true } ),
  ],
  providers: [ LoggedInGuard, UserService ],
  declarations: [ LoginComponent ],
  exports: [
    RouterModule
  ],
})

export class AppRoutingModule {}
