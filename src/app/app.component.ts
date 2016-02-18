import { Component, OnInit } from 'angular2/core'
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router'

import { HeroesComponent } from './hero/heroes.component'
import { HeroService } from './hero/hero.service'
import { DashboardComponent } from './dashboard/dashboard.component'
import { HeroDetailComponent } from './hero/detail/hero-detail.component'

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HeroService
  ],
  template: require('./app.component.html'),
  styles: [
    require('../assets/css/styles.scss'),
    require('./app.component.scss')
  ]
})

@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  }
])

export class AppComponent implements OnInit {
  title = 'Angular 2 application'
  url = 'https://twitter.com/AngularClass'
  angularclassLogo = 'assets/img/angularclass-avatar.png'

  constructor() { }
  ngOnInit() { }
}
