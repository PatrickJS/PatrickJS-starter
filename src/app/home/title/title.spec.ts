import { TestComponentBuilder, addProviders, inject } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing/test_bed';
import { Component } from '@angular/core';
import { BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Title } from './title.service';

describe('Title', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        Title
      ]
    });
  });

  it('should have http', inject([ Title ], (title) => {
    expect(!!title.http).toEqual(true);
  }));

  it('should get data from the server', inject([ Title ], (title) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    title.getData();
    expect(console.log).toHaveBeenCalled();
    expect(title.getData()).toEqual({ value: 'AngularClass' });
  }));

});
