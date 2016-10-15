import {
  inject,
  TestBed,
} from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { HomeComponent } from './home.component';
import { Title } from './title';

describe('Home', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(
          backend: ConnectionBackend,
          defaultOptions: BaseRequestOptions,
        ): Http {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions],
      },
      AppState,
      Title,
      HomeComponent,
    ],
  }));

  it('should have default data', inject([ HomeComponent ], (home: HomeComponent) => {
    expect(home.localState).toEqual({ value: '' });
  }));

  it('should have a title', inject([ HomeComponent ], (home: HomeComponent) => {
    expect(!!home.title).toEqual(true);
  }));

  it('should log ngOnInit with info', inject([ HomeComponent ], (home: HomeComponent) => {
    spyOn(console, 'info');
    expect(console.info).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.info).toHaveBeenCalled();
  }));

});
