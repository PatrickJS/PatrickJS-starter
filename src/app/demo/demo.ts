import { Component } from '@angular/core';

@Component({
  selector: 'demo',
  template: require('./menu.html'),
  styles: [require('./menu.scss')]
})
export class Demo {
  items = [
   {text: 'Refresh'},
   {text: 'Settings'},
   {text: 'Help'},
   {text: 'Sign Out', disabled: true}
 ];

  constructor() {

  }


}
