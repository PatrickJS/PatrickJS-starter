/// <reference path="../../typings/tsd.d.ts" />

 /*
  * TODO: ES5 for now until I make a webpack plugin for protractor
  */
describe('App', function() {

  it('should have a title', function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual('Angular2 Webpack Starter by @gdi2990 from @AngularClass');
  });

});
