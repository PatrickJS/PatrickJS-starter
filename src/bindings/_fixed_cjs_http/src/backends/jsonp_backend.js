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
var browser_jsonp_1 = require('./browser_jsonp');
var async_1 = require('angular2/src/facade/async');
var lang_1 = require('angular2/src/facade/lang');
var JSONPConnection = (function () {
    function JSONPConnection(req, _dom, baseResponseOptions) {
        var _this = this;
        this._dom = _dom;
        this.baseResponseOptions = baseResponseOptions;
        this._finished = false;
        if (req.method !== enums_1.RequestMethods.GET) {
            throw lang_1.makeTypeError("JSONP requests must use GET request method.");
        }
        this.request = req;
        this.response = new async_1.EventEmitter();
        this.readyState = enums_1.ReadyStates.LOADING;
        this._id = _dom.nextRequestID();
        _dom.exposeConnection(this._id, this);
        // Workaround Dart
        // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
        var callback = _dom.requestCallback(this._id);
        var url = req.url;
        if (url.indexOf('=JSONP_CALLBACK&') > -1) {
            url = lang_1.StringWrapper.replace(url, '=JSONP_CALLBACK&', "=" + callback + "&");
        }
        else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
            url = lang_1.StringWrapper.substring(url, 0, url.length - '=JSONP_CALLBACK'.length) + ("=" + callback);
        }
        var script = this._script = _dom.build(url);
        script.addEventListener('load', function (event) {
            if (_this.readyState === enums_1.ReadyStates.CANCELLED)
                return;
            _this.readyState = enums_1.ReadyStates.DONE;
            _dom.cleanup(script);
            if (!_this._finished) {
                async_1.ObservableWrapper.callThrow(_this.response, lang_1.makeTypeError('JSONP injected script did not invoke callback.'));
                return;
            }
            var responseOptions = new base_response_options_1.ResponseOptions({ body: _this._responseData });
            if (lang_1.isPresent(_this.baseResponseOptions)) {
                responseOptions = _this.baseResponseOptions.merge(responseOptions);
            }
            async_1.ObservableWrapper.callNext(_this.response, new static_response_1.Response(responseOptions));
        });
        script.addEventListener('error', function (error) {
            if (_this.readyState === enums_1.ReadyStates.CANCELLED)
                return;
            _this.readyState = enums_1.ReadyStates.DONE;
            _dom.cleanup(script);
            async_1.ObservableWrapper.callThrow(_this.response, error);
        });
        _dom.send(script);
    }
    JSONPConnection.prototype.finished = function (data) {
        // Don't leak connections
        this._finished = true;
        this._dom.removeConnection(this._id);
        if (this.readyState === enums_1.ReadyStates.CANCELLED)
            return;
        this._responseData = data;
    };
    JSONPConnection.prototype.dispose = function () {
        this.readyState = enums_1.ReadyStates.CANCELLED;
        var script = this._script;
        this._script = null;
        if (lang_1.isPresent(script)) {
            this._dom.cleanup(script);
        }
        async_1.ObservableWrapper.callReturn(this.response);
    };
    return JSONPConnection;
})();
exports.JSONPConnection = JSONPConnection;
var JSONPBackend = (function () {
    function JSONPBackend(_browserJSONP, _baseResponseOptions) {
        this._browserJSONP = _browserJSONP;
        this._baseResponseOptions = _baseResponseOptions;
    }
    JSONPBackend.prototype.createConnection = function (request) {
        return new JSONPConnection(request, this._browserJSONP, this._baseResponseOptions);
    };
    JSONPBackend = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [browser_jsonp_1.BrowserJsonp, base_response_options_1.ResponseOptions])
    ], JSONPBackend);
    return JSONPBackend;
})();
exports.JSONPBackend = JSONPBackend;
//# sourceMappingURL=jsonp_backend.js.map