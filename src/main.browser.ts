/*
 * Angular bootstraping
 */
import { ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/app.environment';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app';

platformBrowserDynamic()
  .bootstrapModule(AppModule, {defaultEncapsulation: ViewEncapsulation.None})
  .then(decorateModuleRef)
  .catch(err => console.error(err));
