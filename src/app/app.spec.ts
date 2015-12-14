import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

// Load the implementations that should be tested
import {App} from './app';
import {Title} from './providers/title';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    App,
    Title
  ]);

  it('should have a url', inject([ App ], (app) => {
    expect(app.url).toEqual('https://twitter.com/AngularClass');
  }));

});
