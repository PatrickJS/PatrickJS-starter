/* tslint:disable */

import { NgModuleRef, ApplicationRef } from '@angular/core';
import { disableDebugTools, enableDebugTools } from '@angular/platform-browser';

export interface Environment {
  production: boolean;
  ENV_PROVIDERS: any;
  showDevModule: boolean;
  distSufixTarget: DistSufixTargetEnum;
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