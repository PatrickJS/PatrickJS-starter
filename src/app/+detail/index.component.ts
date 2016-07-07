import { Component } from '@angular/core';

@Component({
  selector: 'index',
  styles: [`
    md-card{
      margin: 25px;
    }
  `],
  template: `
    <md-card>Hello from Index</md-card>
  `
})
export class Index {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Index` component');
  }
}
