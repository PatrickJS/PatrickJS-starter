import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { ElementRef} from 'angular2/core';
import { FormsModule }   from '@angular/forms';
import { AppState } from '../../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { ICourses } from '../courses';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: '<home></home>',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  // Set our default values
  public localState = { value: '' };
  public coursesList;
  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public title: Title
  ) {
    this.coursesList = [];
  }

  public ngOnInit() {
    this.coursesList = [{
      id: 1,
      name: 'kurs 1',
      time: '1h',
      date: '16.03.2017',
      description: `jakis opis At vero eos et accusamus et iusto odio
      dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
      atque corrupti quos dolores et quas molestias excepturi sint occaecati
      cupiditate non provident, similique sunt in culpa qui officia deserunt
       mollitia animi, id est laborum et dolorum fuga`
    }, {
      id: 2,
      name: 'kurs 2',
      time: '1h',
      date: '16.03.2017',
      description: `jakis At vero eos et
       accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
       voluptatum deleniti atque corrupti quos dolores et quas molestias
        excepturi sint occaecati cupiditate non provident, similique sunt in
        culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga`
    }, {
      id: 3,
      name: 'kurs 3',
      time: '1h',
      date: '16.03.2017',
      description: 'jakis opis'
    }, {
      id: 4,
      name: 'kurs 4',
      time: '1h',
      date: '16.03.2017',
      description: 'jakis opis data'
    }, {
      id: 5,
      name: 'kurs 5',
      time: '1h',
      date: '16.03.2017',
      description: `jakis opis jakis opis jakis opisjakis opis
      jakis opis jakis opis jakis opis jakis opis jakis opisjakis
       opisjakis opisjakis opisjakis opisjakis opis`
    } ];
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  private logData(msg: string) {
    console.log(msg);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  public editCurse(id: number) {
    console.log('edit id: ' , id);
  }

  public deleteCurse(id: number) {
    console.log('delete id: ' , id);
  }

}
