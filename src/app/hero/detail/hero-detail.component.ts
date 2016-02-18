import { Component, OnInit } from 'angular2/core'
import {RouteParams} from 'angular2/router'

import { Hero } from '../hero'
import { HeroService } from '../hero.service'

@Component({
  selector: 'my-hero-detail',
  inputs: ['hero'],
  template: require('./hero-detail.component.html'),
  styles: [
    require('./hero-detail.component.scss')
  ]
})

export class HeroDetailComponent {
  hero: Hero

  constructor(
    private _heroService: HeroService,
    private _routeParams: RouteParams
  ) { }

  ngOnInit() {
    let id = +this._routeParams.get('id')
    this._heroService.getHero(id)
      .then(hero => this.hero = hero)
  }

  goBack() {
    window.history.back()
  }
}
