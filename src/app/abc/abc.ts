import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http} from 'angular2/http';

import {Title} from '../providers/title';

@Component({
  selector: 'abc',
  directives: [ FORM_DIRECTIVES ],
  providers: [ Title ],
  pipes: [],
  template: require('./abc.html'),
  styles: [`
    * {background: #f00}
  `]
})
export class Abc {
  // TypeScript public modifiers
  constructor(public title: Title, public http: Http) {
  }

  ngOnInit() {
    console.log('hello Abc');
  }

}
