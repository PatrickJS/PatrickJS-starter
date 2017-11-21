import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dev-module',
  template: `
    <h1>Hello from DevModule Component</h1>
  `,
})
export class DevModuleComponent implements OnInit {

  public ngOnInit() {
    console.log('hello `DevModule` component');
  }

}
