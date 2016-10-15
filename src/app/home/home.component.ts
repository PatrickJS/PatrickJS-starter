import { Component, OnInit } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'my-home',  // <my-home></my-home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title,
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title) {

  }

  public ngOnInit(): void {
    console.info('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  public submitState(value: string): void {
    console.info('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
