import { browser, by, element } from 'protractor';

describe('Home', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/home');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Angular2 Basic';
    expect(subject).toEqual(result);
  });

});
