import * as _ from "lodash";

export class OM {
  protected static _sharedInstance = {};
  static $instance;
  
  static getInstance(): OM {
    if (typeof OM.$instance == "undefined") {
      OM.$instance = new OM();
    }
    return OM.$instance;
  }
  
  static create<T>(object: any, isShare: boolean = false, ...args: any[]): T {
    let instance = Object.create(object.prototype);
    instance.constructor.apply(instance, args);
    if (isShare) {
      OM._sharedInstance[object.name] = instance;
    }
    return <T> instance;
  }
  
  static get<T>(object: any, ...args: any[]): T {
    if (!OM._sharedInstance.hasOwnProperty(object.name)) {
      let instance = Object.create(object.prototype);
      if (!_.isEmpty(args))
        instance.constructor.apply(instance, args);
      OM._sharedInstance[object.name] = instance;
    }
    return <T>OM._sharedInstance[object.name];
  }
}