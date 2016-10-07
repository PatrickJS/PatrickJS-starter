import { Component } from '@angular/core';

@Component({
  selector: 'detail',
  template: `
    <h1>Hello from Detail</h1>
    <router-outlet></router-outlet>
  `
})
export class DetailComponent {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Detail` component');
  }

}
