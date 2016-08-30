import { TestComponentBuilder, addProviders, inject } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing/test_bed';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Load the implementations that should be tested
import { About } from './about.component';

describe('About', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          // provide a better mock
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn) => fn({yourData: 'yolo'})
              }
            }
          },
          About
      ]
    });
  });

  it('should log ngOnInit', inject([ About ], (about) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    about.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
