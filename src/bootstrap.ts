import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

// include for development builds
import {ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/common_dom';
// include for production builds
// import {enableProdMode} from 'angular2/core';

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
