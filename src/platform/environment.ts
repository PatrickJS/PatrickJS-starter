
// Angular 2
// rc2 workaround
import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { enableProdMode as enableProdMode0 } from '@angular/core/src/facade/lang';
import { enableProdMode as enableProdMode1 } from '@angular/compiler/src/facade/lang';
import { enableProdMode as enableProdMode2 } from '@angular/platform-browser/src/facade/lang';
import { CompilerConfig } from '@angular/compiler';
import { PLATFORM_DIRECTIVES, PLATFORM_PIPES } from '@angular/core';
// Environment Providers
let PROVIDERS = [
  // common env directives
];

// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
let _decorateComponentRef = function identity(value) { return value; };

if ('production' === ENV) {
  // Production
  disableDebugTools();
  enableProdMode0();
  enableProdMode1();
  enableProdMode2();

  PROVIDERS = [
    ...PROVIDERS,
    // rc2 workaround
    {
      provide: CompilerConfig,
      useFactory: (platformDirectives: any[], platformPipes: any[]) => {
        let compiler = new CompilerConfig({
          genDebugInfo: true,
          logBindingUpdate: true,
          platformPipes,
          platformDirectives
        });
        return compiler;
      },
      deps: [PLATFORM_DIRECTIVES, PLATFORM_PIPES]
    },
    // custom providers in production
  ];

} else {

  _decorateComponentRef = (cmpRef) => enableDebugTools(cmpRef);

  // Development
  PROVIDERS = [
    ...PROVIDERS,
    // custom providers in development
  ];

}

export const decorateComponentRef = _decorateComponentRef;

export const ENV_PROVIDERS = [
  ...PROVIDERS
];
