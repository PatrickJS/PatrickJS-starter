<<<<<<< HEAD:src/app/home/home.component.ts
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
=======
import { Component } from '@angular/core';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our core.
  providers: [
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent {
  // Set our default values
  name: string;

  // TypeScript public modifiers
  constructor() {}

  ngOnInit() {
    this.name = "World";
  }

>>>>>>> origin/develop:src/app/modules/home/home.component.ts
}
