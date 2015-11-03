/*
 * Angular 2 decorators and services
 */
import {
  Directive,
  Component,
  View,
  ElementRef,
  CORE_DIRECTIVES,
  FORM_DIRECTIVES
} from 'angular2/web_worker/worker';
import {RouteConfig, Router} from 'angular2/router';
//import {Http, Headers} from 'angular2/http';

/*
 * Angular Directives
 */
import {ROUTER_DIRECTIVES} from 'angular2/router';


/*
 * Directive
 * XLarge is a simple directive to show how one is made
 * This won't work in a web worker because it access the DOM directly
 */
@Directive({
  selector: '[x-large]' // using [ ] means selecting attributes
})
class XLarge {
  constructor(element: ElementRef) {
    // simple DOM manipulation to set font size to x-large
    // `nativeElement` is the direct reference to the DOM element
    element.nativeElement.style.fontSize = 'x-large';
  }
}


/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'app', // <app></app>
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, XLarge ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require("!raw!sass!./app.scss")],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./app.html')
})
export class App {
  // These are member type
  title: string;
  data: Array<any> = []; // default data
  // TypeScript public modifiers
  constructor() {
    this.title = 'Angular 2';
  }

  onInit() {
    // Our API
    // Before you start the app, run these commands in another process:
    //
    // - npm run express-install
    // - npm run express
    //
    // This will start a process that will listen for requests on port 3001

    /*const BASE_URL = 'http://localhost:3001';
    const TODO_API_URL = '/api/todos';
    //const JSON_HEADERS = new Headers();

    JSON_HEADERS.append('Accept', 'application/json');
    JSON_HEADERS.append('Content-Type', 'application/json');

    this.http
      .get(BASE_URL + TODO_API_URL, {
        headers: JSON_HEADERS
      })
      .map(res => res.json())
      .subscribe(
        // onNext callback
        data => this.serverData(data),
        // onError callback
        err  => this.errorMessage(err),
        // onComplete callback
        ()   => console.log('complete')
      );//end http
    */
  }

  serverData(data) {
    console.log('data', data);
    this.data = data;
  }//serverData

  errorMessage(err) {
    console.info(`${'\n'
      } // You must run these commands in another process for the Http API to work  ${'\n'
      } npm run express-install ${'\n'
      } npm run express
    `);
  }//errorMessage

}



/*
 * Please review the examples/ folder for more angular app examples
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * you can change the `entry` in webpack.config to quickly view the examples
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 * or via chat on Gitter at https://gitter.im/AngularClass/angular2-webpack-starter
 */
