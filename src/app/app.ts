/*
 * Angular 2 decorators and services
 */
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  selector: 'wm-app', // <app></app>
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    'app.theme.scss'
  ],
  // The template for our app
  templateUrl: 'app.html'
})
export class AppComponent {
  name: string = 'Hello Angular2';
  isDarkTheme: boolean = false;
  constuctor() {
  }
}
