import {Component} from 'angular2/core';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');

@Component({
  selector: 'about',
  template: `patrick@AngularClass.com`
})
export class About {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `About` component');
    // static data that is bundled
    var mockData = require('assets/mock-data/mock-data.json');
    console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    this.asyncDataWithWebpack();
  }
  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    var asyncMockData = require('es6-promise!assets/mock-data/mock-data.json');
    setTimeout(() => {

      let asyncData = asyncMockData();
      asyncData.then(json => {
        console.log('async mockData', json);
      });
      
    });
  }

}
