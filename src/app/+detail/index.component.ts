import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'index',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  template: `
    <router-outlet></router-outlet>
  `
})
export class Index {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Index` component');
  }

}
