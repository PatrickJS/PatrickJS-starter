import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from './dev-module.routes';
import { DevModuleComponent } from './dev-module.component';

/*
      Don't leave side-effects outside of classes so this will tree-shake nicely on prod
      e.g. `console.log('something')` is a side effect.
*/
@NgModule({
  declarations: [ DevModuleComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class DevModuleModule {
  public static routes = routes;
  constructor() {
    console.log('`DevModuleModule` module initialized');
  }
}
