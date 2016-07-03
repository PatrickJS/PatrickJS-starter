// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// AngularClass
import '@angularclass/webpack-toolkit';
import '@angularclass/request-idle-callback';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

// Swiss Styleguide
import 'swiss-styleguide/build/css/print.css';
import 'swiss-styleguide/build/css/admin.css';
import 'swiss-styleguide/build/img/swiss.png';
import 'swiss-styleguide/build/img/logo-CH.svg';
import 'swiss-styleguide/build/img/ico/apple-touch-icon-57x57.png';
import 'swiss-styleguide/build/img/ico/apple-touch-icon-60x60.png';
import 'swiss-styleguide/build/img/ico/apple-touch-icon-72x72.png';
import 'swiss-styleguide/build/img/ico/apple-touch-icon-76x76.png';
import 'swiss-styleguide/build/img/ico/apple-touch-icon-114x114.png';
import 'swiss-styleguide/build/img/ico/apple-touch-icon-120x120.png';
import 'swiss-styleguide/build/img/ico/apple-touch-icon-144x144.png';

import 'swiss-styleguide/build/img/ico/favicon-32x32.png';
import 'swiss-styleguide/build/img/ico/favicon-96x96.png';
import 'swiss-styleguide/build/img/ico/favicon-196x196.png';
import 'swiss-styleguide/build/img/ico/favicon-16x16.png';

import 'swiss-styleguide/build/img/ico/mstile-144x144.png';


if ('production' === ENV) {
  // Production

} else {
  // Development
  require('angular2-hmr');

}
