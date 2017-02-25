import * as _ from "lodash";
export class OM {
  protected _sharedInstance = {};
  static $instance;
  
  static getInstance(): OM {
    if (typeof OM.$instance == "undefined") {
      OM.$instance = new OM();
    }
    return OM.$instance;
  }
  
  create<T>(name: any, isShare: boolean = false, ...args: any[]): T {
    let instance = Object.create(name.prototype);
    instance.constructor.apply(instance, args);
    if (isShare) {
      this._sharedInstance[name.name] = instance;
    }
    return <T> instance;
  }
  
  get<T>(name: any, ...args: any[]): T {
    if (!this._sharedInstance.hasOwnProperty(name.name)) {
      let instance = Object.create(name.prototype);
      if (!_.isEmpty(args))
        instance.constructor.apply(instance, args);
      this._sharedInstance[name.name] = instance;
    }
    return <T>this._sharedInstance[name.name];
  }
}