import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { environment } from 'environments/environment';
import { DistSufixTargetEnum } from 'environments/model';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'home',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [
    Title
  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './home.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  /**
   * Set our default values
   */
  public localState = { value: '' };
  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    public title: Title
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
    console.log('environment.distSufixTarget === DistSufixTargetEnum.DevWorstation: ' +
      (environment.distSufixTarget === DistSufixTargetEnum.DevWorstation));
    console.log('environment.distSufixTarget === DistSufixTargetEnum.Prod: ' +
      (environment.distSufixTarget === DistSufixTargetEnum.Prod));
    console.log('environment.distSufixTarget === DistSufixTargetEnum.StageA: ' +
      (environment.distSufixTarget === DistSufixTargetEnum.StageA));
    console.log('environment.distSufixTarget === DistSufixTargetEnum.StageB: ' +
      (environment.distSufixTarget === DistSufixTargetEnum.StageB));
    console.log('environment: \n' + JSON.stringify(environment, null, 2));
    /**
     * this.title.getData().subscribe(data => this.data = data);
     */
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
