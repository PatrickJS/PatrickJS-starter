/**
 * @author: @AngularClass
 * 
 * @description: a list of DLL bundles and modules they should contain
 */

module.exports = {
  polyfills: [
    'core-js',
    'zone.js',
  ],
  vendor: [
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/core',
    '@angular/common',
    '@angular/forms',
    '@angular/http',
    '@angular/router',
    '@angularclass/hmr',
    'rxjs',
  ] 
};
