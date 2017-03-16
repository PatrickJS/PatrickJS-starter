import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../../app.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'header'
  selector: 'app-header',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './header.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  public iLikeTrainsLogo = 'assets/img/I-LIKE-TRAINS.jpg';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://localhost:3000';
  // TypeScript public modifiers
  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
    this.logData('onInit');
    // this.title.getData().subscribe(data => this.data = data);
  }

  private logData(msg: string) {
    console.log(msg)
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
