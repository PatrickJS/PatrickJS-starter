/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './client/environment';
import { ApplicationRef } from '@angular/core';
import { bootloader } from '@angularclass/hmr';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './client/components';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {

  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch(err => console.error(err));

}


bootloader(main);

