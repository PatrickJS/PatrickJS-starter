import {
  inject,
  TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import { CoreComponent } from './core.component';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CoreComponent
    ]}));

  it('should have a url', inject([ CoreComponent ], (app: CoreComponent) => {
    expect(app.url).toEqual('https://twitter.com/AngularClass');
  }));

});
