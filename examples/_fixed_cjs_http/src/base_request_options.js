'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var lang_1 = require('angular2/src/facade/lang');
var headers_1 = require('./headers');
var enums_1 = require('./enums');
var di_1 = require('angular2/di');
var url_search_params_1 = require('./url_search_params');
/**
 * Creates a request options object similar to the `RequestInit` description
 * in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#requestinit) to be optionally provided when instantiating a
 * {@link Request}.
 *
 * All values are null by default.
 */
var RequestOptions = (function () {
    function RequestOptions(_a) {
        var _b = _a === void 0 ? {} : _a, method = _b.method, headers = _b.headers, body = _b.body, mode = _b.mode, credentials = _b.credentials, cache = _b.cache, url = _b.url, search = _b.search;
        this.method = lang_1.isPresent(method) ? method : null;
        this.headers = lang_1.isPresent(headers) ? headers : null;
        this.body = lang_1.isPresent(body) ? body : null;
        this.mode = lang_1.isPresent(mode) ? mode : null;
        this.credentials = lang_1.isPresent(credentials) ? credentials : null;
        this.cache = lang_1.isPresent(cache) ? cache : null;
        this.url = lang_1.isPresent(url) ? url : null;
        this.search = lang_1.isPresent(search) ? (lang_1.isString(search) ? new url_search_params_1.URLSearchParams((search)) :
            (search)) :
            null;
    }
    /**
     * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
     * existing values.
     */
    RequestOptions.prototype.merge = function (options) {
        return new RequestOptions({
            method: lang_1.isPresent(options) && lang_1.isPresent(options.method) ? options.method : this.method,
            headers: lang_1.isPresent(options) && lang_1.isPresent(options.headers) ? options.headers : this.headers,
            body: lang_1.isPresent(options) && lang_1.isPresent(options.body) ? options.body : this.body,
            mode: lang_1.isPresent(options) && lang_1.isPresent(options.mode) ? options.mode : this.mode,
            credentials: lang_1.isPresent(options) && lang_1.isPresent(options.credentials) ? options.credentials :
                this.credentials,
            cache: lang_1.isPresent(options) && lang_1.isPresent(options.cache) ? options.cache : this.cache,
            url: lang_1.isPresent(options) && lang_1.isPresent(options.url) ? options.url : this.url,
            search: lang_1.isPresent(options) && lang_1.isPresent(options.search) ?
                (lang_1.isString(options.search) ? new url_search_params_1.URLSearchParams((options.search)) :
                    (options.search).clone()) :
                this.search
        });
    };
    return RequestOptions;
})();
exports.RequestOptions = RequestOptions;
/**
 * Injectable version of {@link RequestOptions}, with overridable default values.
 *
 * #Example
 *
 * ```
 * import {Http, BaseRequestOptions, Request} from 'angular2/http';
 * ...
 * class MyComponent {
 *   constructor(baseRequestOptions:BaseRequestOptions, http:Http) {
 *     var options = baseRequestOptions.merge({body: 'foobar', url: 'https://foo'});
 *     var request = new Request(options);
 *     http.request(request).subscribe(res => this.bars = res.json());
 *   }
 * }
 *
 * ```
 */
var BaseRequestOptions = (function (_super) {
    __extends(BaseRequestOptions, _super);
    function BaseRequestOptions() {
        _super.call(this, { method: enums_1.RequestMethods.GET, headers: new headers_1.Headers(), mode: enums_1.RequestModesOpts.Cors });
    }
    BaseRequestOptions = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BaseRequestOptions);
    return BaseRequestOptions;
})(RequestOptions);
exports.BaseRequestOptions = BaseRequestOptions;
//# sourceMappingURL=base_request_options.js.map