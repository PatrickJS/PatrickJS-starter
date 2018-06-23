/**
 * Angular bootstrapping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from 'environments/environment';

/**
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app';
import { NgModuleRef } from '@angular/core';

/**
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  let modulePromise: Promise<NgModuleRef<AppModule>> = null;

  if (module['hot']) {
    module['hot'].accept();
    module['hot'].dispose(() => {
      // Before restarting the app, we create a new root element and dispose the old one
      const oldRootElem = document.querySelector('app');
      const newRootElem = document.createElement('app');
      oldRootElem!.parentNode!.insertBefore(newRootElem, oldRootElem);
      if (modulePromise) {
        modulePromise.then((appModule) => {
          appModule.destroy();
          if (oldRootElem !== null) {
            oldRootElem!.parentNode!.removeChild(oldRootElem);
          }
          return appModule;
        });
      }
    });
  }

  modulePromise = platformBrowserDynamic().bootstrapModule(AppModule);

  return modulePromise.then(environment.decorateModuleRef).catch((err) => console.error(err));
}

/**
 * Needed for hmr
 * in prod this is replace for document ready
 */
switch (document.readyState) {
  case 'loading':
    document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
    break;
  case 'interactive':
  case 'complete':
  default:
    main();
}

function _domReadyHandler() {
 document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
 main();
}
