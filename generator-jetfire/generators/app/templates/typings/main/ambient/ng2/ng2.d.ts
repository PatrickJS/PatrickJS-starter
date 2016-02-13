// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/gdi2290/typings-ng2/32998ff5584c0eab0cd9dc7704abb1c5c450701c/ng2.d.ts
declare var assert: any;


interface BrowserNodeGlobal {
  Object: typeof Object;
  Array: typeof Array;
  Map: typeof Map;
  Set: typeof Set;
  Date: typeof Date;
  RegExp: typeof RegExp;
  JSON: typeof JSON;
  Math: typeof Math;
  assert(condition: any): void;
  Reflect: any;
  zone: Zone;
  getAngularTestability: Function;
  getAllAngularTestabilities: Function;
  setTimeout: Function;
  clearTimeout: Function;
  setInterval: Function;
  clearInterval: Function;
}