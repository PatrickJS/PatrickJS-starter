import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

// Load the implementations that should be tested
import {AppCmp} from './app.component';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    AppCmp
  ]);

  it('should have a url', inject([ AppCmp ], (app) => {
    expect(app.url).toEqual('https://twitter.com/AngularClass');
  }));

});
