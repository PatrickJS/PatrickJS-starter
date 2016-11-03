import { enableProdMode } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';

// Environment Providers
let PROVIDERS: any[] = [
  // common env directives
];

/*
 * Production
 */
if (ENV === 'production') {
  // Production
  disableDebugTools();
  enableProdMode();

  PROVIDERS = [
    ...PROVIDERS,
    // custom providers in production
  ];

} else {

  // Development
  PROVIDERS = [
    ...PROVIDERS,
    // custom providers in development
  ];

}

export const ENV_PROVIDERS = [
  ...PROVIDERS,
];
