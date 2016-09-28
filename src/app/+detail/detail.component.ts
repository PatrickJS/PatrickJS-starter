import { Component } from '@angular/core';

@Component({
  selector: 'detail',
  styles: [`
    md-card{
      margin: 25px;
    }
  `],
  template: `
    <md-card>
      <h1>Hello from Detail</h1>
    </md-card>
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
