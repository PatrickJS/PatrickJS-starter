import {Injectable} from '@angular/core';

@Injectable()

export class Title {

	value: string;
	constructor() {
		this.value = 'Angular 2';
	}
}
