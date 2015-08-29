'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var test_lib_1 = require('angular2/test_lib');
var async_1 = require('angular2/src/facade/async');
var browser_xhr_1 = require('http/src/backends/browser_xhr');
var xhr_backend_1 = require('http/src/backends/xhr_backend');
var di_1 = require('angular2/di');
var static_request_1 = require('http/src/static_request');
var headers_1 = require('http/src/headers');
var collection_1 = require('angular2/src/facade/collection');
var base_request_options_1 = require('http/src/base_request_options');
var base_response_options_1 = require('http/src/base_response_options');
var enums_1 = require('http/src/enums');
var abortSpy;
var sendSpy;
var openSpy;
var setRequestHeaderSpy;
var addEventListenerSpy;
var existingXHRs = [];
var unused;
var MockBrowserXHR = (function (_super) {
    __extends(MockBrowserXHR, _super);
    function MockBrowserXHR() {
        _super.call(this);
        var spy = new test_lib_1.SpyObject();
        this.abort = abortSpy = spy.spy('abort');
        this.send = sendSpy = spy.spy('send');
        this.open = openSpy = spy.spy('open');
        this.setRequestHeader = setRequestHeaderSpy = spy.spy('setRequestHeader');
        this.callbacks = new collection_1.Map();
    }
    MockBrowserXHR.prototype.setStatusCode = function (status) { this.status = status; };
    MockBrowserXHR.prototype.setResponse = function (value) { this.response = value; };
    MockBrowserXHR.prototype.setResponseText = function (value) { this.responseText = value; };
    MockBrowserXHR.prototype.addEventListener = function (type, cb) { this.callbacks.set(type, cb); };
    MockBrowserXHR.prototype.dispatchEvent = function (type) { this.callbacks.get(type)({}); };
    MockBrowserXHR.prototype.build = function () {
        var xhr = new MockBrowserXHR();
        existingXHRs.push(xhr);
        return xhr;
    };
    return MockBrowserXHR;
})(browser_xhr_1.BrowserXhr);
function main() {
    test_lib_1.describe('XHRBackend', function () {
        var backend;
        var sampleRequest;
        test_lib_1.beforeEach(function () {
            var injector = di_1.Injector.resolveAndCreate([
                di_1.bind(base_response_options_1.ResponseOptions)
                    .toClass(base_response_options_1.BaseResponseOptions),
                di_1.bind(browser_xhr_1.BrowserXhr).toClass(MockBrowserXHR),
                xhr_backend_1.XHRBackend
            ]);
            backend = injector.get(xhr_backend_1.XHRBackend);
            var base = new base_request_options_1.BaseRequestOptions();
            sampleRequest = new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ url: 'https://google.com' })));
        });
        test_lib_1.afterEach(function () { existingXHRs = []; });
        test_lib_1.it('should create a connection', function () { test_lib_1.expect(function () { return backend.createConnection(sampleRequest); }).not.toThrow(); });
        test_lib_1.describe('XHRConnection', function () {
            test_lib_1.it('should use the injected BaseResponseOptions to create the response', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ type: enums_1.ResponseTypes.Error }));
                async_1.ObservableWrapper.subscribe(connection.response, function (res) {
                    test_lib_1.expect(res.type).toBe(enums_1.ResponseTypes.Error);
                    async.done();
                });
                existingXHRs[0].dispatchEvent('load');
            }));
            test_lib_1.it('should complete a request', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ type: enums_1.ResponseTypes.Error }));
                async_1.ObservableWrapper.subscribe(connection.response, function (res) {
                    test_lib_1.expect(res.type).toBe(enums_1.ResponseTypes.Error);
                }, null, function () { async.done(); });
                existingXHRs[0].dispatchEvent('load');
            }));
            test_lib_1.it('should call abort when disposed', function () {
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR());
                connection.dispose();
                test_lib_1.expect(abortSpy).toHaveBeenCalled();
            });
            test_lib_1.it('should automatically call open with method and url', function () {
                new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR());
                test_lib_1.expect(openSpy).toHaveBeenCalledWith('GET', sampleRequest.url);
            });
            test_lib_1.it('should automatically call send on the backend with request body', function () {
                var body = 'Some body to love';
                var base = new base_request_options_1.BaseRequestOptions();
                new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ body: body }))), new MockBrowserXHR());
                test_lib_1.expect(sendSpy).toHaveBeenCalledWith(body);
            });
            test_lib_1.it('should attach headers to the request', function () {
                var headers = new headers_1.Headers({ 'Content-Type': 'text/xml', 'Breaking-Bad': '<3' });
                var base = new base_request_options_1.BaseRequestOptions();
                new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ headers: headers }))), new MockBrowserXHR());
                test_lib_1.expect(setRequestHeaderSpy).toHaveBeenCalledWith('Content-Type', ['text/xml']);
                test_lib_1.expect(setRequestHeaderSpy).toHaveBeenCalledWith('Breaking-Bad', ['<3']);
            });
            test_lib_1.it('should return the correct status code', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var statusCode = 418;
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ status: statusCode }));
                async_1.ObservableWrapper.subscribe(connection.response, function (res) {
                    test_lib_1.expect(res.status).toBe(statusCode);
                    async.done();
                });
                existingXHRs[0].setStatusCode(statusCode);
                existingXHRs[0].dispatchEvent('load');
            }));
            test_lib_1.it('should normalize IE\'s 1223 status code into 204', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var statusCode = 1223;
                var normalizedCode = 204;
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ status: statusCode }));
                async_1.ObservableWrapper.subscribe(connection.response, function (res) {
                    test_lib_1.expect(res.status).toBe(normalizedCode);
                    async.done();
                });
                existingXHRs[0].setStatusCode(statusCode);
                existingXHRs[0].dispatchEvent('load');
            }));
            test_lib_1.it('should normalize responseText and response', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var responseBody = 'Doge';
                var connection1 = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions());
                var connection2 = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions());
                async_1.ObservableWrapper.subscribe(connection1.response, function (res) {
                    test_lib_1.expect(res.text()).toBe(responseBody);
                    async_1.ObservableWrapper.subscribe(connection2.response, function (ress) {
                        test_lib_1.expect(ress.text()).toBe(responseBody);
                        async.done();
                    });
                    existingXHRs[1].dispatchEvent('load');
                });
                existingXHRs[0].setResponseText(responseBody);
                existingXHRs[1].setResponse(responseBody);
                existingXHRs[0].dispatchEvent('load');
            }));
        });
    });
}
exports.main = main;
//# sourceMappingURL=xhr_backend_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();