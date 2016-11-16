/*
 * Angular 2 decorators and services
 */
import { Component, OnInit, Input } from '@angular/core';
/*
 * Home Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: 'wm-home', // <app></app>
    // The template for our app
    template: `
    <md-card>
      <div>
         <h1>{{name}}</h1>
      </div>
      <br/>
      <div>
         <span>{{counter}}</span>
         <button (click)="incrementCounter()">Increment number</button>
      </div>
    </md-card>
    `
})
export class HomeComponent implements OnInit {
    @Input() name: string = 'Hello Angular2';
    counter: number = 0;
    constructor() {
    }

    incrementCounter() {
        let newCounter = this.counter + 5;
        this.counter = newCounter;
    }

    ngOnInit() {
        // Our API
    }
}
