/* tslint:disable */
import { enableProdMode } from '@angular/core';
import { Environment, decorateModuleRefProd, DistSufixTargetEnum } from './model';

enableProdMode();

// export const ENV_FIREBASE_CONFIG: any = FIREBASE_CONFIG;

export const environment: Environment = {
  production: true,
  showDevModule: false,
  distSufixTarget: DIST_SUFIX_TARGET as any as DistSufixTargetEnum,

  /** Angular debug tools in the dev console
   * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
   * @param modRef
   * @return {any}
   */
  decorateModuleRef: decorateModuleRefProd,
  ENV_PROVIDERS: [

  ]
};
