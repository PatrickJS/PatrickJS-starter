/*
 * Providers provided by Angular
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

/**
 * AoT compile.
 * First run `./node_modules/.bin/ngc -p ./src/`
 */

// import { platformBrowser } from '@angular/platform-browser';
// import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';
//
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
