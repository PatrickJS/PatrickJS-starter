/// <reference path="../../typings/_custom.d.ts" />

 /*
  * TODO: ES5 for now until I make a webpack plugin for protractor
  */
describe('App', function() {
  var subject;
  var result;

  beforeEach(function() {
    browser.get('/');
  });

  afterEach(function() {
    expect(subject).toEqual(result);
  });

  it('should have a title', function() {
    subject = browser.getTitle();
    result  = 'Angular2 Webpack Starter by @gdi2990 from @AngularClass';
  });

  it('should have <header>', function() {
    subject = element(by.deepCss('app /deep/ header')).isPresent();
    result  = true;
  });

  it('should have <main>', function() {
    subject = element(by.deepCss('app /deep/ main')).isPresent();
    result  = true;
  });

  it('should have <footer>', function() {
    subject = element(by.deepCss('app /deep/ footer')).getText();
    result  = 'WebPack Angular 2 Starter by @AngularClass';
  });

});
