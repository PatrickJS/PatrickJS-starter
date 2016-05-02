import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from '@angular/testing';

import {Component, provide} from '@angular/core';

// Load the implementations that should be tested
import {About} from './about.component';

describe('About', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    About
  ]);

  it('should log ngOnInit', inject([ About ], (about) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    about.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
