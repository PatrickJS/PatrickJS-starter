/// <reference path="../typings/_custom.d.ts" />

/*
 * Angular 2 decorators and services
 */
import {Directive, Component, View, LifecycleEvent} from 'angular2/angular2';
import {RouteConfig, Router} from 'angular2/router';
import {Http} from 'angular2/http';

/*
 * Angular Directives
 */
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'app'
})
@View({
  // We need to tell Angular's compiler what's in the template
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  // list of styles
  styles: [`
    .title {
      font-family: Arial, Helvetica, sans-serif;
    }
    main {
      padding: 1em;
    }
  `],
  template: `
  <header>
    <h1 class="title">Hello {{ title }}</h1>
  </header>

  <main>
    Your Content Here
    <div>
      <input type="text" [(ng-model)]="title" autofocus>
    </div>

    <pre>this.title = {{ title | json }}</pre>
    <pre>this.data = {{ data | json }}</pre>

  </main>

  <footer>
    WebPack Angular 2 Starter by <a href="https://twitter.com/AngularClass">@AngularClass</a>
  </footer>
  `
})
export class App {
  title: string;
  data: Array<any> = []; // default data
  constructor(public http: Http) {
    this.title = 'Angular 2';

    // Our API
    // npm run express-install
    // npm run express

    const BASE_URL = 'http://localhost:3001';
    const TODO_API_URL = '/api/todos';
    const JSON_HEADERS = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const http = this.http;

    http
      .get(BASE_URL + TODO_API_URL, {
        headers: JSON_HEADERS
      })
      .toRx()
      .map(res => res.json())
      .subscribe(
        // onNext callback
        data => this.serverData(data),
        // onError callback
        err  => this.errorMessage(err)
      );//end http
  }

  serverData(data) {
    console.log('data', data);
    this.data = data;
  }//serverData

  errorMessage(err) {
    if (err && (/Unexpected token/).test(err.message) || err.status === 0) {
      console.info(`${'\n'
        } // You must run these commands for the Http API to work in another process ${'\n'
        } npm run express-install ${'\n'
        } npm run express
      `);
    }//end err.message
  }//errorMessage

}
