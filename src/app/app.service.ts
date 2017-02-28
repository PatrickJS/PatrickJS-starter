import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import * as _ from "lodash";

@Injectable()
export class AppService {
  viewState = {isOverLoad: false};
  _stream   = {};
  modules   = {};
  data      = {
    isInstalledModule: {}
  };
  
  overload(isOverLoad: boolean = true): void {
    this.viewState['isOverLoad'] = isOverLoad;
  }
  
  getChangeDetectorStream() {
    if (!this._stream.hasOwnProperty('changeDetect')) {
      this._stream['changeDetect'] = new Subject();
    }
    return this._stream['changeDetect'];
  }
}
