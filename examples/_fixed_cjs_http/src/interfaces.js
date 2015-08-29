'use strict';/// <reference path="../../angular2/typings/rx/rx.d.ts" />
var lang_1 = require('angular2/src/facade/lang');
var url_search_params_1 = require('./url_search_params');
// Work around Dartanalyzer problem :(
var URLSearchParams_UnionFixer = url_search_params_1.URLSearchParamsUnionFixer;
/**
 * Abstract class from which real backends are derived.
 *
 * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
 * {@link Request}.
 */
var ConnectionBackend = (function () {
    function ConnectionBackend() {
    }
    ConnectionBackend.prototype.createConnection = function (request) { throw new lang_1.BaseException('Abstract!'); };
    return ConnectionBackend;
})();
exports.ConnectionBackend = ConnectionBackend;
/**
 * Abstract class from which real connections are derived.
 */
var Connection = (function () {
    function Connection() {
    }
    Connection.prototype.dispose = function () { throw new lang_1.BaseException('Abstract!'); };
    return Connection;
})();
exports.Connection = Connection;
//# sourceMappingURL=interfaces.js.map