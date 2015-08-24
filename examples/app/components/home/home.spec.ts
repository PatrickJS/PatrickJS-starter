/// <reference path="../../../typings/_custom.d.ts" />
import {Component, View} from 'angular2/angular2';
import {Home} from './home';

@Component({
  selector: 'test-cmp'
})
@View({
  directives: [ Home ]
})
class TestComponent {

}

describe('Home', () => {
  var home;

  beforeEach(() => {
    home = new Home();
  });

  it('should work', () => {
    expect(home).toBeDefined();
  });

});

