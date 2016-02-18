import { Component, OnInit } from 'angular2/core'
import { Router } from 'angular2/router'

import { Hero } from './hero'
import { HeroDetailComponent } from './detail/hero-detail.component'
import { HeroService } from './hero.service'
import { CapitalizePipe } from '../common/pipe/capitalize.pipe'

@Component({
  selector: 'my-heroes',
  directives: [HeroDetailComponent],
  pipes: [CapitalizePipe],
  template: require('./heroes.component.html'),
  styles: [
    require('./heroes.component.scss')
  ]
})

export class HeroesComponent implements OnInit {
  title = 'my heroes'
  heroes: Hero[]
  selectedHero: Hero

  constructor(
    private _router: Router,
    private _heroService: HeroService
  ) { }

  ngOnInit() {
    this.getHeroes()
  }

  getHeroes() {
    this._heroService.getHeroes()
      .then(heroes => this.heroes = heroes)
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero
  }

  gotoDetail(hero: Hero) {
    this._router.navigate(['HeroDetail', { id: this.selectedHero.id }])
  }
}
