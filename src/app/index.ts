// App
export * from './app.component';
export * from './app.service';
export * from './app.routes';

import {AppState} from './app.service';
import {ZasTranslationService} from './shared-zas/services/zas-translation.service';

// Application wide providers
export const APP_PROVIDERS = [
    AppState, ZasTranslationService
];
