import * as _ from "lodash";

export class DataObject extends Object {
  // abstract identify: string;
  
  constructor(data?: Object) {
    super();
    if (data) {
      _.forEach(data, (v, k) => this[k] = v);
    }
  }
  
  getFirst(): any {
    return this[0];
  }
  
  getData(key?: string): any {
    if (typeof key == "undefined")
      return this;
    
    let strKey = key + '';
    if (this.hasOwnProperty(strKey))
      return this[strKey];
    else
      return null;
  }
  
  setData(key, value): any {
    let strKey   = key + '';
    this[strKey] = value;
    return this;
  }
  
  hasData(key): boolean {
    let strKey = key + '';
    return this.hasOwnProperty(strKey) && this[strKey] != null;
  }
  
  unsetData(key): any {
    if (this.hasData(key))
      delete this[key];
    return this;
  }
  
  addData(data: Object): any {
    _.forEach(
      data, (v, k) => {
        let strKey   = k + '';
        this[strKey] = v;
      });
    return this;
  }
}