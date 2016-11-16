/*
 * Angular 2 decorators and services
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

console.log('`About` component loaded asynchronously');

/*
 * Home Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: 'wm-about', // <app></app>
    // The template for our app
    templateUrl: './about.component.html'
})
export class AboutComponent {
    aboutMsg: string = 'About';
    constructor() {
    }
}
