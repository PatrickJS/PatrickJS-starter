// Angular 2
import * as angular from 'angular2/angular2';
import {Component, View} from 'angular2/angular2';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'app' // <app></app>
})
@View({
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
  Hello from Angular 2
  `
})
class App {
  constructor() {
    console.log('Angular 2 App component');
  }

}

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our services/bindings into Angular's dependency injection
 */
angular.bootstrap(App, []);


// index.html
/*

<!DOCTYPE html>
<html>
<head>
  <title>AngularClass</title>
  <script src="/lib/es6-shim.js"></script>
</head>
<body>

  <!-- Our Top Level Component -->
  <app></app>

  <script src="/__build__/common.js"></script>
  <script src="/__build__/angular2.js"></script>
  <script src="/__build__/app.js"></script>
</body>
</html>

*/
