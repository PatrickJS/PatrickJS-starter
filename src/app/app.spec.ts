import {
  addProviders,
  inject
} from '@angular/core/testing';

// Load the implementations that should be tested
import { App } from './app.component';
import { AppState } from './app.service';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => addProviders([
    AppState,
    App
  ]));

  it('should have a url', inject([ App ], (app) => {
    expect(app.url).toEqual('https://twitter.com/AngularClass');
  }));

});
