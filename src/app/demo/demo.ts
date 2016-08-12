import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../platform/browser/angular2-material2';
import { FormsModule } from '@angular/forms';
import { Menu } from './menu/menu';
import { TooltipDemo } from './tooltip/tooltip';
import { Layout } from './layout/layout';

@Component({
  selector: 'demo',
  template: require('./demo.html'),
})
export class Demo {


  constructor() {

  }


}

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule],
  exports: [Demo],
  declarations: [Demo, Menu, TooltipDemo, Layout],
  entryComponents: [Demo]
})
export class DemoModule { }
