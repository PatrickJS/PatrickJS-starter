import {Component} from '@angular/core';
import {Http} from '@angular/http';

import {Title} from '../../providers/title';

@Component({
	selector: 'page1',
	providers: [ Title ],
	template: require('./page1.html'),
})

export class Page1 {

	constructor (
		public title: Title,
		public http: Http
	) {}

	ngOnInit() {
		console.log('Page 1');
	}

}
