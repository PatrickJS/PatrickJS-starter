/*
 * Angular bootstraping
 */
import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';
import { decorateModuleRef } from './app/environment';
import { platformBrowser }    from '@angular/platform-browser';

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

export function bootstrap(main) {
  if (document.readyState === 'complete') {
    main();
  } else {
    document.addEventListener('DOMContentLoaded', main);
  }
}

bootstrap(main);
