export class Store {
  // we shouldn't access ._state
  constructor(private _state: any) {}
  // Ensure Immutable state
  set state(newState) {
    // Add ImmutableJS and use it
    this._state = poorMansDeepRefCopy(this._state, newState);
  }

  // Ensure Immutable state
  get state() {
    return this._state;
  }

  get(type?: string) {
    console.log('real copy')
    var state = poorMansCopy(this.state);
    return (type) ? state[type] : state;
  }
  set(prop: any, value?: any) {
    this.state = (value === undefined) ? prop : {
      [prop]: value
    }
  }
}




function poorMansDeepRefCopy(current, next) {
  // Same Value
  if (current === next) {
    return current;
  }
  // New Value
  else if (current === undefined) { return next }

  // Recurse Array or Object
  else if (isArray(next)) {
    let newState = new Array(next.length);
    for (let i = 0; i < next.length; ++i) {
      newState[i] = poorMansDeepRefCopy(current[i], next[i]);
    }//for
    return newState;
  }//Array

  // Recurse Object
  else if (isObject(next)) {
    let newState = {};
    for (let prop in next) {
      if (next.hasOwnProperty(prop)) {
        newState[prop] = poorMansDeepRefCopy(current[prop], next[prop]);
      }//hasOwn
    }//for-in
    return newState;
  }//Object

  // Default
  return next;
}

function poorMansCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}


function isArray(arr): boolean {
  return Array.isArray(arr);
}
function isObject(obj): boolean {
  if (obj == null)   return false;
  if (isDate(obj))   return false;
  if (isRegExp(obj)) return false;
  return typeof obj === 'object';
}
function isRegExp(exp) {
  return exp instanceof RegExp;
}
function isFunction(func) {
  return typeof func === 'function';
}
function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}
function isString(str) {
  return typeof str === 'string';
}
