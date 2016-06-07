import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {Http} from '@angular/http';

import {Title} from '../../providers/title';

@Component({
	selector: 'home',
	directives: [ FORM_DIRECTIVES ],
	providers: [ Title ],
	template: require('./home.html')
})

export class Home {


	constructor (
		public title: Title,
		public http: Http
	) {}

	setRandom () {
		this.title.value = Math.random().toString();
	}

	ngOnInit () {
		console.log('Home');
	}

}
