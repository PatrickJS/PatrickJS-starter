import { Component } from '@angular/core';

@Component({
  selector: 'index',

  template: `
    <h1>Hello from Index</h1>
  `
})
export class Index {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Index` component');
  }
}
