import { Injectable } from '@angular/core';
import { TECHS } from './mock-techs';
import { Tech } from './tech';

@Injectable()
export class TechsService {

  getTechs(): Tech[] {
      return TECHS;
  }
}
