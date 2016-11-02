/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
platformBrowserDynamic().bootstrapModule(AppModule);
