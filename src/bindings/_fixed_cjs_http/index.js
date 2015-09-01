'use strict';function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
require('reflect-metadata');
require('traceur-runtime');
var http_1 = require('./http');
var angular2_1 = require('angular2/angular2');
__export(require('./http'));
/**
 * TODO(jeffbcross): export each as their own top-level file, to require as:
 * require('http/http'); require('http/jsonp');
 */
exports.http = angular2_1.Injector.resolveAndCreate([http_1.HTTP_BINDINGS]).get(http_1.Http);
exports.jsonp = angular2_1.Injector.resolveAndCreate([http_1.JSONP_BINDINGS]).get(http_1.Jsonp);
//# sourceMappingURL=index.js.map