/* tslint:disable */

import { NgModuleRef, ApplicationRef } from '@angular/core';
import { disableDebugTools, enableDebugTools } from '@angular/platform-browser';

export interface Environment {
  production: boolean;
  ENV_PROVIDERS: any;
  showDevModule: boolean;
  distSufixTarget: DistSufixTargetEnum;
  /**
   * It affects the CompilerOptions so that in 'development' mode it is 
   * possible to use the 'Emulated', which is useful, for example, 
   * when working on visual changes such as styles, because for non 
   * runnable feature tests it can be faster. In this case the faster options is
   * set "sourceMapEnabled" to false on 'config/config.json' and use 
   * 'NgTemplateStrategyEnum.Emulated'.
   * 
   * When using 'Emulated' there is no, on browser, files like 
   * 'ng:///AppModule/AboutComponent.ngfactory.js', using 'Jit' this files are
   * generated.
   * 
   * In 'production' mode always use Aot.
   * In 'development' mode always use Emulated or Jit.
   */
  ngTemplateStrategy: NgTemplateStrategyEnum;
  decorateModuleRef(modRef: NgModuleRef<any>): NgModuleRef<any>;
}

export function decorateModuleRefProd(modRef: NgModuleRef<any>): NgModuleRef<any> {
  disableDebugTools();
  return modRef;
}

export function decorateModuleRefDev(modRef: NgModuleRef<any>): NgModuleRef<any> {
  const appRef = modRef.injector.get(ApplicationRef);
  const cmpRef = appRef.components[0];

  let _ng = (<any>window).ng;
  enableDebugTools(cmpRef);
  (<any>window).ng.probe = _ng.probe;
  (<any>window).ng.coreTokens = _ng.coreTokens;
  return modRef;
}

export enum DistSufixTargetEnum {
  StageA = 'stage_a' as any,
  StageB = 'stage_b' as any,
  Prod = 'prod' as any,
  DevWorstation = '' as any,
}

export enum NgTemplateStrategyEnum {
  Aot,
  Jit,
  Emulated
}
