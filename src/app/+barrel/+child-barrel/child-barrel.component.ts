import {
  Component,
  OnInit,
} from '@angular/core';
/**
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Barrel` component loaded asynchronously');

@Component({
  selector: 'child-barrel',
  template: `
    <h1>Hello from Child Barrel</h1>    
  `,
})
export class ChildBarrelComponent implements OnInit {

  public ngOnInit() {
    console.log('hello `ChildBarrel` component');
  }

}
