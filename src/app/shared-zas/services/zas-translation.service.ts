import {TranslateService} from 'ng2-translate/ng2-translate';
import {Injectable} from '@angular/core';
import * as _ from 'underscore';

@Injectable()
export class ZasTranslationService {

    public static SUPPORTED_LANGUAGES: string[] = ['de', 'fr', 'it'];
    public static DEFAULT_LANGUAGE:  string = 'fr';

    constructor(private translate: TranslateService) {
        let userLang = navigator.language.split('-')[0];
        translate.setDefaultLang(ZasTranslationService.DEFAULT_LANGUAGE);

        this.setLang(userLang);
    }

    getLang(): string {
        return this.translate.currentLang;
    }

    setLang(lang: string): void {
        this.translate.use(
            _.contains(ZasTranslationService.SUPPORTED_LANGUAGES, lang) ?
            lang : ZasTranslationService.DEFAULT_LANGUAGE);
    }
}
