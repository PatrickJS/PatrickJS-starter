import { Component, NgModule } from '@angular/core';
import { Index } from './index.component';

@Component({
  selector: 'detail',
  template: `
  Detail
    <router-outlet></router-outlet>
  `
})
export class Detail {
  items = [
   {text: 'Refresh'},
   {text: 'Settings'},
   {text: 'Help'},
   {text: 'Sign Out', disabled: true}
 ];

  constructor() {

  }

  ngOnInit() {
    console.log('hello `Detail` component');
  }

}
