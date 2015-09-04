/// <reference path="../typings/_custom.d.ts" />

/*
 * Angular 2 decorators and servces
 */
import {Directive, Component, View, LifecycleEvent} from 'angular2/angular2';
import {RouteConfig, Router} from 'angular2/router';
import {Http, Jsonp} from 'angular2/http';

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
  selector: 'app',
  lifecycle: [ LifecycleEvent.onInit ]
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  style: [`
    .title {
      font-family: Arial,
      Helvetica, sans-serif;
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
  }

  onInit() {
    // npm run express-install
    // npm run express

    const BASE_URL = 'http://localhost:3001';
    const TODO_API_URL = '/api/todos';

    this.http.
      get(BASE_URL + TODO_API_URL, {
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

  }//onInit

  serverData(data) {
    console.log('data', data);
    this.data = data;
  }//serverData

  errorMessage(err) {
    if (err && (/Unexpected token/).test(err.message) || err.status === 0) {
      console.info(`${'\n'
        } // You must run these commands for the Http API to work in another process ${'\n'
        } npm install express-install ${'\n'
        } npm run express
      `);
    }//end err.message
  }//errorMessage

}
