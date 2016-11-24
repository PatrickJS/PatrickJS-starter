import {
  async,
  inject,
  TestBed,
} from '@angular/core/testing';
import { NoComponent } from './no-content.component.ts';

describe('no-content Component', () => {
   beforeEach(done => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [ NoComponent ],
    });

    // create component and test fixture
    fixture = TestBed.createComponent(NoComponent);

    // get test component from the fixture
    comp = fixture.componentInstance;
  });
})