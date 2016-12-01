import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/#/');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Angular2 Basic';
    expect(subject).toEqual(result);
  });

  it('should have Toolbar', () => {
    let subject = element(by.css('md-toolbar')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have a component with classname grid-title', () => {
    let subject = element(by.className('grid-title')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });
});
