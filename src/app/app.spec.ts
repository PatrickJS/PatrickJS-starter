import {
  it,
  inject,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';
import {RootRouter} from 'angular2/src/router/router';
import {Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {Location} from 'angular2/platform/common';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {provide} from 'angular2/core';
// Load the implementations that should be tested
import {App} from './app.component';
import {AppState} from './app.service';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    AppState,
    RouteRegistry,
    provide(Location, {useClass: SpyLocation}),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
    provide(Router, {useClass: RootRouter}),
    App
  ]);

  it('should have a url', inject([ App ], (app) => {
    expect(app.url).toEqual('https://twitter.com/AngularClass');
  }));

});
