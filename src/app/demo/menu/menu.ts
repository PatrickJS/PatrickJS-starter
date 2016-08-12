import { Component } from '@angular/core';

@Component({
  selector: 'demo-menu',
  template: require('./menu.html'),
  styles: [require('./menu.scss')]
})
export class Menu {
  items = [
   {text: 'Refresh'},
   {text: 'Settings'},
   {text: 'Help'},
   {text: 'Sign Out', disabled: true}
 ];

}
