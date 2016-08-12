import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'detail',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  template: `
  Detail
    <router-outlet></router-outlet>
  `
})
export class Detail {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Detail` component');
  }

}
