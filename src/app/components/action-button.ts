/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, ElementRef} from 'angular2/angular2';

@Component({
	selector: 'action-button'
})
@View({
	template: `<button (click)="doAction()">Action!</button>`
})
export class ActionButton {
	constructor(public el:ElementRef) {
		
	}
	doAction(){
		this.el.domElement.dispatchEvent(new Event('yummy'));
	}
} 