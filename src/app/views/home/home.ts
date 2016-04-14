import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http} from 'angular2/http';

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
