import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'my-detail',
  template: `
    <h1>Hello from Detail</h1>
    <router-outlet></router-outlet>
  `,
})
export class DetailComponent implements OnInit {

  public ngOnInit() {
    console.log('hello `Detail` component');
  }

}
