describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Angular2 Webpack Starter by @gdi2290 from @AngularClass';
    expect(subject).toEqual(result);
  });

  it('should have <md-toolbar>', () => {
    let subject = element(by.css('app md-toolbar')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have <md-content>', () => {
    let subject = element(by.css('app md-content')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have text in footer', () => {
    let subject = element(by.css('app #footerText')).getText();
    let result  = 'WebPack Angular 2 Starter by @AngularClass';
    expect(subject).toEqual(result);
  });

});
