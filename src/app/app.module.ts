import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/page1',
		pathMatch: 'full',
	},
	{
		path: 'page1',
		component: Page1Component,
	},
	{
		path: 'page2',
		component: Page2Component,
	},
];


@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot( routes, { useHash: true } ),
	],
	declarations: [ AppComponent, Page1Component, Page2Component ],
	bootstrap: [ AppComponent ],
})
export class AppModule { }
