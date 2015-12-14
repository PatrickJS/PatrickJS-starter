import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';
import {Title} from './title';

describe('Title', () => {
  let title;

  beforeEach(() => {
    title = new Title();
  });

  it('should return the list of names', () => {
    expect(title.value).toEqual('Angular 2');
  });
});
