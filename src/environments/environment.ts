/* tslint:disable */

import { Environment, decorateModuleRefDev, DistSufixTargetEnum, NgTemplateStrategyEnum } from './model';

Error.stackTraceLimit = Infinity;
require('zone.js/dist/long-stack-trace-zone');

// export const ENV_FIREBASE_CONFIG: any = FIREBASE_CONFIG;

export const environment: Environment = {
  production: false,
  showDevModule: true,
  distSufixTarget: DistSufixTargetEnum.DevWorstation,
  // In 'development' mode always use Emulated or Jit.
  ngTemplateStrategy: NgTemplateStrategyEnum.Jit,

  /** Angular debug tools in the dev console
   * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
   * @param modRef
   * @return {any}
   */
  decorateModuleRef: decorateModuleRefDev,
  ENV_PROVIDERS: [

  ]
};

