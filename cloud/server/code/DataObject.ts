import * as _ from "lodash";

export class DataObject {
  // abstract identify: string;
  
  protected _data: any = {};
  
  constructor(_data = {}) {
    this.addData(_data);
  }
  
  getData(key?: string): any {
    if (typeof key == "undefined")
      return this._data;
    
    if (this.hasOwnProperty(key))
      return this._data[key];
    else
      return null;
  }
  
  setData(key: string, value: any): any {
    this._data[key] = value;
    return this;
  }
  
  hasData(key: string): boolean {
    return this.hasOwnProperty(key) && this._data[key] != null;
  }
  
  unsetData(key: string): any {
    if (this.hasData(key))
      delete this._data[key];
    return this;
  }
  
  addData(data: Object): any {
    _.forEach(
      data, (v, k) => {
        this._data[k] = v;
      });
    return this;
  }
}