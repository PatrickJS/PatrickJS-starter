import * as _ from 'lodash';
import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';

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

  public tableData = [
    {
      Id: 1,
      FirstName: '2wovjolbpq81rqn8qoctus',
      LastName: 'dji7l2vatru7lxg6m1ix7r',
      NickName: 'obovos9awulejgj1hdtpqv'
    },
    {
      Id: 2,
      FirstName: 'rw8yjmuoud8mpeoxdz9y',
      LastName: 'x54t9ullpbgnmebv72ycsh',
      NickName: 'tp4x8d2iy8h8e3wnnzzat'
    },
    {
      Id: 3,
      FirstName: 'ey7x660qn5fgvq1tjr5qtn',
      LastName: 'pgq3u6kysav5prkedobr',
      NickName: 'cr5wvz0lfi52oc1kll5hr'
    },
    {
      Id: 4,
      FirstName: 'v6oqvu9v8ji7o11xuukg',
      LastName: '7f2lvke0lvr6dgcogd02av',
      NickName: '95pc2gytrsqrm77rbnr3a'
    },
    {
      Id: 5,
      FirstName: 'peav4671kcao5036rs8npc',
      LastName: 'ilv1ez54zffbf1frx39ff',
      NickName: '20lnnxpz6h8ilg5cgojf6'
    },
    {
      Id: 6,
      FirstName: '1xc3h161la3kmwvk2tput',
      LastName: 'u2xn8iuv3fk58ad03k4qmd',
      NickName: 'x6v4ov1t1ts79z8twls1uv'
    },
    {
      Id: 7,
      FirstName: 'itp3ntru0l8zsdcwqphene',
      LastName: '91k7izpxxvbdjst0632m9m',
      NickName: '88fc4dv6g3l2mz039182d7'
    },
    {
      Id: 8,
      FirstName: 'kw11tgj3kilrow417chiih',
      LastName: 'v4khc2qktrfoihvxmhnzrb',
      NickName: 'sprsnz2zcchnq5m91vu7u'
    },
    {
      Id: 9,
      FirstName: 'n7tje6mpi6qn6hpgaezu',
      LastName: 'x8h08wba35pzlahq8aymg',
      NickName: 'w2b2d7xj2kldlj2wjmgofs'
    },
    {
      Id: 10,
      FirstName: '3fl09oey0ltthezw4rctoi',
      LastName: 'ztlmsoxpunc9akwujssy49',
      NickName: 'mb0hb91urq1jvs8thelq1'
    }
  ];

  public defaultOptions = {
      keyField: 'Id',
      defaultPageSize: 5,
      columns: [
          {
              Header: 'ID',
              accessor: 'Id'
          },
          {
              Header: 'First Name',
              accessor: 'FirstName'
          },
          {
              Header: 'Last Name',
              accessor: 'LastName'
          },
          {
              Header: 'Nickname',
              accessor: 'NickName'
          }
      ]
  };

  public isLoading = false;

  public noResultsMessage = 'no records found';

  public selectType = 'checkbox';
  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    public title: Title
  ) {}

  private randomString() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  public ngOnInit() {
    console.log('hello `Home` component');
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
