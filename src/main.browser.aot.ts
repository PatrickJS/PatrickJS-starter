/*
 * Angular bootstraping
 */
import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';
import { bootloader } from '@angularclass/hmr';
import { decorateModuleRef } from './app/environment';
import { platformBrowser }    from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory)
    .then(decorateModuleRef)
    .catch(err => console.error(err));
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
