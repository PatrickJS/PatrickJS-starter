import { Injectable } from '@angular/core';

import { TranslateService } from 'ng2-translate';


@Injectable()
export class MultiLanguageService {
  langSelected : string;
  langDefault : string = 'en';
  translateService: TranslateService;

  constructor(translateService: TranslateService) {
    this.translateService = translateService;
    this.translateService.setDefaultLang(this.langDefault);
  }

  initialize(){
    if (this.langSelected) {
      return this.langSelected;
    }

    if (localStorage) {
      let lang = localStorage['language'] || this.langDefault;
      this.setLanguage(lang);
    }
    else {
      this.setLanguage(this.langDefault);
    }

  }

  getLanguage() {
    return this.langSelected;
  }

  setLanguage(language: string){
    if (localStorage) {
      localStorage['language'] = language;
    }
    this.langSelected = language;
    this.translateService.use(this.langSelected);
  }

}