import {Component} from 'angular2/core';
import {Http} from 'angular2/http';

import {Title} from '../../providers/title';

@Component({
	selector: 'page2',
	providers: [ Title ],
	template: require('./page2.html'),
})

export class Page2 {

	constructor (
		public title: Title,
		public http: Http
	) {}

	ngOnInit() {
		console.log('Page 2');
	}

}
