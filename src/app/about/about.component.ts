import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');

@Component({
  selector: 'about',
  styles: [`
    md-card{
      margin: 25px;
    }
  `],
  template: `
  <md-card>
    For hot module reloading run
    <pre>npm run start:hmr</pre>
  </md-card>
  <md-card>
    <h3>
      patrick@AngularClass.com
    </h3>
  </md-card>
  <md-card>
    <pre>this.localState = {{ localState | json }}</pre>
  </md-card>
  `
})
export class About {
  localState;
  constructor(public route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });
  }


}
