/// <reference path="../typings/_custom.d.ts" />

/*
 * TODO: use the real App component
 * change `app-simple.js` to `app.js` in src/public/index.html
 */

/*
 * Angular 2 decorators and servces
 */
import {Directive, Component, View, ViewEncapsulation, Http} from 'angular2/angular2';
import {RouteConfig, Router} from 'angular2/router';

/*
 * Angular Directives
 */
import {coreDirectives, formDirectives} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app'
})
@View({
  encapsulation: ViewEncapsulation.EMULATED,
  // needed in order to tell Angular's compiler what's in the template
  directives: [ coreDirectives, formDirectives, routerDirectives ],
  template: `
  <style>
    .title { font-family: Arial, Helvetica, sans-serif; }
  </style>

  <header>
    <h1 class="title">Hello {{ name }}</h1>
  </header>

  <main>
    Your Content Here
    <div>
      <input type="text" [(ng-model)]="name" autofocus>
    </div>
    <pre>data = {{ data | json }}</pre>
  </main>

  <footer>
    WebPack Angular 2 Starter by <a href="https://twitter.com/AngularClass">@AngularClass</a>
  </footer>
  `
})
export class App {
  name: string;
  data: Array<any> = []; // default data
  constructor(public http: Http) {
    this.name = 'Angular 2';
    this.getData();
  }
  getData() {
    // npm install express connect-history-api-fallback morgan body-parser
    // npm run express

    this.http.
      get('/api/todos', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).
      toRx().
      map(res => res.json()).
      subscribe(
        // onNext value
        data => this.serverData(data),
        // onError
        err  => this.errorMessage(err)
      );//end http
  }

  serverData(data) {
    console.log('data', data);
    this.data = data;
  }
  errorMessage(err) {
    if (err && (/Unexpected token/).test(err.message)) {
      console.info(`${'\n'
        } // You must run these commands for the Http API to work ${'\n'
        } npm install express connect-history-api-fallback morgan body-parser ${'\n'
        } npm run express
      `);
    }//end err.message
  }
}
