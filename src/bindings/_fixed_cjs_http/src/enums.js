'use strict';/**
 * Acceptable origin modes to be associated with a {@link Request}, based on
 * [RequestMode](https://fetch.spec.whatwg.org/#requestmode) from the Fetch spec.
 */
(function (RequestModesOpts) {
    RequestModesOpts[RequestModesOpts["Cors"] = 0] = "Cors";
    RequestModesOpts[RequestModesOpts["NoCors"] = 1] = "NoCors";
    RequestModesOpts[RequestModesOpts["SameOrigin"] = 2] = "SameOrigin";
})(exports.RequestModesOpts || (exports.RequestModesOpts = {}));
var RequestModesOpts = exports.RequestModesOpts;
/**
 * Acceptable cache option to be associated with a {@link Request}, based on
 * [RequestCache](https://fetch.spec.whatwg.org/#requestcache) from the Fetch spec.
 */
(function (RequestCacheOpts) {
    RequestCacheOpts[RequestCacheOpts["Default"] = 0] = "Default";
    RequestCacheOpts[RequestCacheOpts["NoStore"] = 1] = "NoStore";
    RequestCacheOpts[RequestCacheOpts["Reload"] = 2] = "Reload";
    RequestCacheOpts[RequestCacheOpts["NoCache"] = 3] = "NoCache";
    RequestCacheOpts[RequestCacheOpts["ForceCache"] = 4] = "ForceCache";
    RequestCacheOpts[RequestCacheOpts["OnlyIfCached"] = 5] = "OnlyIfCached";
})(exports.RequestCacheOpts || (exports.RequestCacheOpts = {}));
var RequestCacheOpts = exports.RequestCacheOpts;
/**
 * Acceptable credentials option to be associated with a {@link Request}, based on
 * [RequestCredentials](https://fetch.spec.whatwg.org/#requestcredentials) from the Fetch spec.
 */
(function (RequestCredentialsOpts) {
    RequestCredentialsOpts[RequestCredentialsOpts["Omit"] = 0] = "Omit";
    RequestCredentialsOpts[RequestCredentialsOpts["SameOrigin"] = 1] = "SameOrigin";
    RequestCredentialsOpts[RequestCredentialsOpts["Include"] = 2] = "Include";
})(exports.RequestCredentialsOpts || (exports.RequestCredentialsOpts = {}));
var RequestCredentialsOpts = exports.RequestCredentialsOpts;
/**
 * Supported http methods.
 */
(function (RequestMethods) {
    RequestMethods[RequestMethods["GET"] = 0] = "GET";
    RequestMethods[RequestMethods["POST"] = 1] = "POST";
    RequestMethods[RequestMethods["PUT"] = 2] = "PUT";
    RequestMethods[RequestMethods["DELETE"] = 3] = "DELETE";
    RequestMethods[RequestMethods["OPTIONS"] = 4] = "OPTIONS";
    RequestMethods[RequestMethods["HEAD"] = 5] = "HEAD";
    RequestMethods[RequestMethods["PATCH"] = 6] = "PATCH";
})(exports.RequestMethods || (exports.RequestMethods = {}));
var RequestMethods = exports.RequestMethods;
// TODO: Remove this when enum lookups are available in ts2dart
// https://github.com/angular/ts2dart/issues/221
var RequestMethodsMap = (function () {
    function RequestMethodsMap() {
        this._methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'];
    }
    RequestMethodsMap.prototype.getMethod = function (method) { return this._methods[method]; };
    return RequestMethodsMap;
})();
exports.RequestMethodsMap = RequestMethodsMap;
/**
 * All possible states in which a connection can be, based on
 * [States](http://www.w3.org/TR/XMLHttpRequest/#states) from the `XMLHttpRequest` spec, but with an
 * additional "CANCELLED" state.
 */
(function (ReadyStates) {
    ReadyStates[ReadyStates["UNSENT"] = 0] = "UNSENT";
    ReadyStates[ReadyStates["OPEN"] = 1] = "OPEN";
    ReadyStates[ReadyStates["HEADERS_RECEIVED"] = 2] = "HEADERS_RECEIVED";
    ReadyStates[ReadyStates["LOADING"] = 3] = "LOADING";
    ReadyStates[ReadyStates["DONE"] = 4] = "DONE";
    ReadyStates[ReadyStates["CANCELLED"] = 5] = "CANCELLED";
})(exports.ReadyStates || (exports.ReadyStates = {}));
var ReadyStates = exports.ReadyStates;
/**
 * Acceptable response types to be associated with a {@link Response}, based on
 * [ResponseType](https://fetch.spec.whatwg.org/#responsetype) from the Fetch spec.
 */
(function (ResponseTypes) {
    ResponseTypes[ResponseTypes["Basic"] = 0] = "Basic";
    ResponseTypes[ResponseTypes["Cors"] = 1] = "Cors";
    ResponseTypes[ResponseTypes["Default"] = 2] = "Default";
    ResponseTypes[ResponseTypes["Error"] = 3] = "Error";
    ResponseTypes[ResponseTypes["Opaque"] = 4] = "Opaque";
})(exports.ResponseTypes || (exports.ResponseTypes = {}));
var ResponseTypes = exports.ResponseTypes;
//# sourceMappingURL=enums.js.map