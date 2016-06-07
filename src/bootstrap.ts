import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {APP_BASE_HREF} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';

// include for development builds
import {ELEMENT_PROBE_PROVIDERS} from '@angular/platform-browser';
// include for production builds
// import {enableProdMode} from '@angular/core';

import {App} from './app/app';

// enableProdMode() // include for production builds

export function main() {
	return bootstrap(App, [
		HTTP_PROVIDERS,
		ROUTER_PROVIDERS,
		provide(APP_BASE_HREF, {useValue: '/'}),
		ELEMENT_PROBE_PROVIDERS // remove in production
	])
	.catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', main);
require('styles/style.scss'); // webpack to compile scss
