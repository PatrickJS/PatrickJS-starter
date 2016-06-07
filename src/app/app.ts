import {Component} from '@angular/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Http} from '@angular/http';
import {FORM_PROVIDERS} from '@angular/common';


import {Title} from './providers/title';
import {Home}  from './views/home/home';
import {Page1} from './views/page1/page1';
import {Page2} from './views/page2/page2';

@Component({

	selector: 'app',
	providers: [ FORM_PROVIDERS, Title ],
	directives: [ ROUTER_DIRECTIVES ],
	pipes: [],
	template: `

		<header>
			<nav>
				<a [routerLink]=" ['Home'] ">Home</a>
				<a [routerLink]=" ['Page1'] ">Page 1</a>
				<a [routerLink]=" ['Page2'] ">Page 2</a>
			</nav>
		</header>

		<main>
			<router-outlet></router-outlet>
		</main>

		<footer>{{info}}</footer>
	`
})

@RouteConfig([
	{ path: '/',      component: Home, name: 'Home' },
	{ path: '/page1', component: Page1, name: 'Page1' },
	{ path: '/page2', component: Page2, name: 'Page2' },
])

export class App {

	info: string = 'Angular 2 Electron Starter';

	constructor (
		public title: Title,
		private router: Router
	) {}

	ngOnInit () {
		console.log('App Start');
		this.router.navigate(['Home']);
	}
}
