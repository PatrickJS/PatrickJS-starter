import { Component } from '@angular/core';

@Component({
  selector: 'index',
  template: `<h1>Hello from Detail's Index</h1>
<div>
  This component has been lazy loaded.
  It has its own routing.
</div>
      `
})
export class Index {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Detail\'s index` component');
  }
}
