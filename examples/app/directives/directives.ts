/// <reference path="../../typings/_custom.d.ts" />
/*
 * Angular 2
 */
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
// should be ROUTER_DIRECTIVES in next release
import {routerDirectives as ROUTER_DIRECTIVES} from 'angular2/router';

/*
 * App
 */
import {Autofocus} from './Autofocus';

// global App only directives
export var SERVICES_DIRECTIVES: Array<any> = [
  Autofocus
];

// global Angular core and other Angular module directives (form/router)
export var ANGULAR_DIRECTIVES: Array<any> = [
  // Angular's core directives
  CORE_DIRECTIVES,

  // Angular's form directives
  FORM_DIRECTIVES,

  // Angular's router
  ROUTER_DIRECTIVES,
];

// global App only directives
export var APP_DIRECTIVES: Array<any> = [
  ANGULAR_DIRECTIVES,
  SERVICES_DIRECTIVES
];

