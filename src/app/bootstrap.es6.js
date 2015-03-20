import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';
BrowserDomAdapter.makeCurrent();

import {bootstrap} from 'angular2/angular2';
import {document} from 'angular2/src/facade/browser';

import {App} from 'components/app.es6.js';

// lolwut, because I can
document.addEventListener('DOMContentLoaded', function() {
  bootstrap(App, []);
}, false);
