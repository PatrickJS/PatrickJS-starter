import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { LoggedInGuard } from '../services/logged-in.guard';
import { UserService } from '../services/user';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full',
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'page1',
		component: Page1Component,
		canActivate: [LoggedInGuard],
	},
	{
		path: 'page2',
		component: Page2Component,
		canActivate: [LoggedInGuard],
	},
];


@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot( routes, { useHash: true } ),
	],
	declarations: [ AppComponent, LoginComponent, Page1Component, Page2Component ],
	bootstrap: [ AppComponent ],
	providers: [ LoggedInGuard, UserService ],
})
export class AppModule { }
