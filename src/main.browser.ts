import 'meteor-client';
import "lib.custom";
/*
 * Angular bootstraping
 */
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {decorateModuleRef} from './app/environment';
import {bootloader} from '@angularclass/hmr';
/*
 * App Module
 * our top level module that holds all of our components
 */
import {AppModule} from './app';
import {MeteorObservable} from "meteor-rxjs";

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): any {
  Meteor.startup(() => {
    const subscription = MeteorObservable.autorun().subscribe(() => {
      
      if (Meteor.loggingIn()) {
        return;
      }
      
      setTimeout(() => subscription.unsubscribe());
      return platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .then(decorateModuleRef)
        .catch((err) => console.error(err));
    });
  });
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
