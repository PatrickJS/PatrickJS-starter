'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
var enums_1 = require('../enums');
var static_response_1 = require('../static_response');
var base_response_options_1 = require('../base_response_options');
var di_1 = require('angular2/di');
var browser_xhr_1 = require('./browser_xhr');
var async_1 = require('angular2/src/facade/async');
var lang_1 = require('angular2/src/facade/lang');
/**
 * Creates connections using `XMLHttpRequest`. Given a fully-qualified
 * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
 * request.
 *
 * This class would typically not be created or interacted with directly inside applications, though
 * the {@link MockConnection} may be interacted with in tests.
 */
var XHRConnection = (function () {
    // https://github.com/angular/ts2dart/issues/230
    function XHRConnection(req, browserXHR, baseResponseOptions) {
        var _this = this;
        // TODO: get rid of this when enum lookups are available in ts2dart
        // https://github.com/angular/ts2dart/issues/221
        var requestMethodsMap = new enums_1.RequestMethodsMap();
        this.request = req;
        this.response = new async_1.EventEmitter();
        this._xhr = browserXHR.build();
        // TODO(jeffbcross): implement error listening/propagation
        this._xhr.open(requestMethodsMap.getMethod(lang_1.ENUM_INDEX(req.method)), req.url);
        this._xhr.addEventListener('load', function (_) {
            // responseText is the old-school way of retrieving response (supported by IE8 & 9)
            // response/responseType properties were introduced in XHR Level2 spec (supported by IE10)
            var response = lang_1.isPresent(_this._xhr.response) ? _this._xhr.response : _this._xhr.responseText;
            // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
            var status = _this._xhr.status === 1223 ? 204 : _this._xhr.status;
            // fix status code when it is 0 (0 status is undocumented).
            // Occurs when accessing file resources or on Android 4.1 stock browser
            // while retrieving files from application cache.
            if (status === 0) {
                status = response ? 200 : 0;
            }

            var responseOptions = new base_response_options_1.ResponseOptions({ body: response, status: status });
            if (lang_1.isPresent(baseResponseOptions)) {
                responseOptions = baseResponseOptions.merge(responseOptions);
            }
            async_1.ObservableWrapper.callNext(_this.response, new static_response_1.Response(responseOptions));
            // TODO(gdi2290): defer complete if array buffer until done
            async_1.ObservableWrapper.callReturn(_this.response);
        });

        this._xhr.addEventListener('error', function (err) {
            var responseOptions = new base_response_options_1.ResponseOptions({
              body: err,
              type: enums_1.ResponseTypes.Error,
              status: _this._xhr.status,
              ok: false
            });

            if (lang_1.isPresent(baseResponseOptions)) {
                responseOptions = baseResponseOptions.merge(responseOptions);
            }
            async_1.ObservableWrapper.callThrow(_this.response, new static_response_1.Response(responseOptions));
        });
        // TODO(jeffbcross): make this more dynamic based on body type
        if (lang_1.isPresent(req.headers)) {
            req.headers.forEach(function (value, name) { _this._xhr.setRequestHeader(name, value); });
        }
        try {
          this._xhr.send(this.request.text());
        } catch(err) {
          var responseOptions = new base_response_options_1.ResponseOptions({ body: err, type: enums_1.ResponseTypes.Error });
          if (lang_1.isPresent(baseResponseOptions)) {
              responseOptions = baseResponseOptions.merge(responseOptions);
          }
          async_1.ObservableWrapper.callThrow(_this.response, new static_response_1.Response(responseOptions));
        }
    }
    /**
     * Calls abort on the underlying XMLHttpRequest.
     */
    XHRConnection.prototype.dispose = function () { this._xhr.abort(); };
    return XHRConnection;
})();
exports.XHRConnection = XHRConnection;
/**
 * Creates {@link XHRConnection} instances.
 *
 * This class would typically not be used by end users, but could be
 * overridden if a different backend implementation should be used,
 * such as in a node backend.
 *
 * #Example
 *
 * ```
 * import {Http, MyNodeBackend, HTTP_BINDINGS, BaseRequestOptions} from 'http/http';
 * @Component({
 *   viewBindings: [
 *     HTTP_BINDINGS,
 *     bind(Http).toFactory((backend, options) => {
 *       return new Http(backend, options);
 *     }, [MyNodeBackend, BaseRequestOptions])]
 * })
 * class MyComponent {
 *   constructor(http:Http) {
 *     http('people.json').subscribe(res => this.people = res.json());
 *   }
 * }
 * ```
 *
 **/
var XHRBackend = (function () {
    function XHRBackend(_browserXHR, _baseResponseOptions) {
        this._browserXHR = _browserXHR;
        this._baseResponseOptions = _baseResponseOptions;
    }
    XHRBackend.prototype.createConnection = function (request) {
        return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
    };
    XHRBackend = __decorate([
        di_1.Injectable(),
        __metadata('design:paramtypes', [browser_xhr_1.BrowserXhr, base_response_options_1.ResponseOptions])
    ], XHRBackend);
    return XHRBackend;
})();
exports.XHRBackend = XHRBackend;
//# sourceMappingURL=xhr_backend.js.map
