/// <reference path="../typings/_custom.d.ts" />

/*
 * Angular 2 decorators and servces
 */
import {Directive, Component, View} from 'angular2/angular2';
import {RouteConfig, Router} from 'angular2/router';

/*
 * Angular Directives
 */
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
// should be ROUTER_DIRECTIVES in next release
import {routerDirectives as ROUTER_DIRECTIVES} from 'angular2/router';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app'
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  style: [`
    .title { font-family: Arial, Helvetica, sans-serif; }
  `],
  template: `
  <header>
    <h1 class="title">Hello {{ name }}</h1>
  </header>

  <main>
    Your Content Here
    <div>
      <input type="text" [(ng-model)]="name" autofocus>
    </div>
    <pre>this.data = {{ data | json }}</pre>
  </main>

  <footer>
    WebPack Angular 2 Starter by <a href="https://twitter.com/AngularClass">@AngularClass</a>
  </footer>
  `
})
export class App {
  name: string;
  data: Array<any> = []; // default data
  constructor() {
    this.name = 'Angular 2';
    this.getData();
  }
  
  getData() {
    // fake async call
    setTimeout(() => {
      let data = [
        { value: 'finish example', created_at: new Date() }
      ];
      
      // fake callback
      this.data = data;

    }, 2000);

  }

}
