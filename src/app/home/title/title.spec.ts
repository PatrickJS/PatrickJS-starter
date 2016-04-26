import {
  it,
  inject,
  beforeEachProviders
} from 'angular2/testing';

import {provide} from 'angular2/core';
import {BaseRequestOptions, Http, ResponseOptions, Response} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';


import {Title} from './title.service';

describe('Title', () => {
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    Title
  ]);


  it('should have http', inject([ Title ], (title) => {
    expect(!!title.http).toEqual(true);
  }));

  it('should get data from the server', inject([ Title, MockBackend ], (title, mockBackend) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    mockBackend.connections.subscribe(
      connection => connection.mockRespond(new Response(
        new ResponseOptions({
          body: {
            data: {
              value: 'AngularClass'
            }
          }
        })
      ))
    );
    title.getData().subscribe(data => expect(data).toEqual({value: 'AngularClass'}));
    expect(console.log).toHaveBeenCalled();
  }));

});
