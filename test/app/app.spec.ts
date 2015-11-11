/// <reference path="../../src/typings/_custom.d.ts" />

// Import necessary wrappers for Jasmine
import {
  beforeEachProviders,
  describe,
  expect,
  iit,
  inject,
  it,
  injectAsync,
  fakeAsync,
  TestComponentBuilder,
  tick
} from 'angular2/testing';
import { Component, provide} from 'angular2/angular2';
import {MockBackend, BaseRequestOptions, Http} from 'angular2/http';

// Load the implementations that should be tested
import { App, XLarge } from '../../src/app/app';

// Create a test component to test directives
@Component({
  template: '',
  directives: [XLarge]
})
class TestComponent {
}

describe('x-large directive', () => {
  it('should sent font-size to x-large', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(TestComponent, '<div x-large>Content</div>')
      .createAsync(TestComponent).then((fixture: any) => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement.children[0];
        expect(compiled.style.fontSize).toBe('x-large');
      });
  }));

});

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    App,
    BaseRequestOptions,
    MockBackend,
    provide(Http, {useFactory:
      function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]})
  ]);

  it('should have a title', inject([App], (app) => {
    expect(app.title).toEqual('Angular 2');
  }));

});
