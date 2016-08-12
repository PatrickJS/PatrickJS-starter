import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../platform/browser/angular2-material2';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule],
  exports: [Detail],
  declarations: [Detail],
  entryComponents: [Detail]
})
export class DetailModule { }
