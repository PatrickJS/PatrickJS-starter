/*
 * These are globally available directives in any template
 */
// Angular 2
import { PLATFORM_DIRECTIVES } from '@angular/core';
// Angular 2 Router
import { ROUTER_DIRECTIVES } from '@angular/router';
// Angular 2 forms
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

// Angular 2 Material 2
// TODO(gdi2290): replace with @angular2-material/all
import { MATERIAL_DIRECTIVES } from './browser/angular2-material2';

// application_directives: directives that are global through out the application
export const APPLICATION_DIRECTIVES = [
  ...ROUTER_DIRECTIVES,
  ...REACTIVE_FORM_DIRECTIVES,
  ...MATERIAL_DIRECTIVES
];

export const DIRECTIVES = [
  { provide: PLATFORM_DIRECTIVES, multi: true, useValue: APPLICATION_DIRECTIVES }
];
