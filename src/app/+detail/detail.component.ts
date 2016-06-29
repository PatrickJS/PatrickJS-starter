import { Component } from '@angular/core';

@Component({
  selector: 'detail',

  template: `
    <h1>Hello from Detail</h1>
  `
})
export class Detail {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Detail` component');
  }
}
