/// <reference path="../../typings/_custom.d.ts" />
/*
 * Angular 2
 */
import {coreDirectives} from 'angular2/directives';
import {routerDirectives} from 'angular2/router';
import {formDirectives} from 'angular2/forms';

/*
 * App
 */
import {Autofocus} from './Autofocus';

// global App only directives
export var appDirectives: Array<any> = [
  Autofocus
];

// global Angular core and other Angular module directives (form/router)
export var angularDirectives: Array<any> = [
  // Angular's core directives
  coreDirectives,

  // Angular's form directives
  formDirectives,

  // Angular's router
  routerDirectives
];
