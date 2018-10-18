/**
 * Angular bootstrapping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from 'environments/environment';
import { NgModuleRef, ViewEncapsulation, CompilerOptions } from '@angular/core';

/**
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app';
import { ROOT_SELECTOR } from './app/app.component';
import { NgTemplateStrategyEnum } from 'environments/model';

/**
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  let modulePromise: Promise<NgModuleRef<AppModule>> = null;

  if (module['hot']) {
    module['hot'].accept();
    module['hot'].dispose(() => {
      // Before restarting the app, we create a new root element and dispose the old one
      const oldRootElem = document.querySelector(ROOT_SELECTOR);
      const newRootElem = document.createElement(ROOT_SELECTOR);
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

  if (environment.production
      && environment.ngTemplateStrategy !== NgTemplateStrategyEnum.Aot) {
    throw new Error(
      `
      * In 'production' mode always use Aot.
      * In 'development' mode always use Emulated or Jit.
      `);
  }
  if (!environment.production
      && environment.ngTemplateStrategy === NgTemplateStrategyEnum.Aot) {
    throw new Error(
      `
      * In 'production' mode always use Aot.
      * In 'development' mode always use Emulated or Jit.
      `);
  }

  let compilerOptions: CompilerOptions;
  if (environment.ngTemplateStrategy === NgTemplateStrategyEnum.Emulated) {
    compilerOptions = {
      defaultEncapsulation: ViewEncapsulation.Emulated,
      useJit: false
    };
  }
  modulePromise = platformBrowserDynamic().bootstrapModule(AppModule, compilerOptions);

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
