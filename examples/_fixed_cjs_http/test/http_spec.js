'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var test_lib_1 = require('angular2/test_lib');
var di_1 = require('angular2/di');
var mock_backend_1 = require('http/src/backends/mock_backend');
var async_1 = require('angular2/src/facade/async');
var http_1 = require('http/http');
var SpyObserver = (function (_super) {
    __extends(SpyObserver, _super);
    function SpyObserver() {
        _super.call(this);
        this.onNext = this.spy('onNext');
        this.onError = this.spy('onError');
        this.onCompleted = this.spy('onCompleted');
    }
    return SpyObserver;
})(test_lib_1.SpyObject);
function main() {
    test_lib_1.describe('http', function () {
        var url = 'http://foo.bar';
        var http;
        var injector;
        var backend;
        var baseResponse;
        test_lib_1.beforeEach(function () {
            injector = di_1.Injector.resolveAndCreate([
                http_1.BaseRequestOptions,
                mock_backend_1.MockBackend,
                di_1.bind(http_1.Http).toFactory(function (backend, defaultOptions) {
                    return new http_1.Http(backend, defaultOptions);
                }, [mock_backend_1.MockBackend, http_1.BaseRequestOptions])
            ]);
            http = injector.get(http_1.Http);
            backend = injector.get(mock_backend_1.MockBackend);
            baseResponse = new http_1.Response(new http_1.ResponseOptions({ body: 'base response' }));
        });
        test_lib_1.afterEach(function () { return backend.verifyNoPendingRequests(); });
        test_lib_1.describe('Http', function () {
            test_lib_1.describe('.request()', function () {
                test_lib_1.it('should return an Observable', function () { test_lib_1.expect(async_1.ObservableWrapper.isObservable(http.request(url))).toBe(true); });
                test_lib_1.it('should accept a fully-qualified request as its only parameter', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(backend.connections, function (c) {
                        test_lib_1.expect(c.request.url).toBe('https://google.com');
                        c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: 'Thank you' })));
                        async.done();
                    });
                    async_1.ObservableWrapper.subscribe(http.request(new http_1.Request(new http_1.RequestOptions({ url: 'https://google.com' }))), function (res) { });
                }));
                test_lib_1.it('should perform a get request for given url if only passed a string', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(backend.connections, function (c) { return c.mockRespond(baseResponse); });
                    async_1.ObservableWrapper.subscribe(http.request('http://basic.connection'), function (res) {
                        test_lib_1.expect(res.text()).toBe('base response');
                        async.done();
                    });
                }));
                // TODO: make dart not complain about "argument type 'Map' cannot be assigned to the
                // parameter type 'IRequestOptions'"
                // xit('should perform a get request for given url if passed a dictionary',
                //     inject([AsyncTestCompleter], async => {
                //       ObservableWrapper.subscribe(backend.connections, c => c.mockRespond(baseResponse));
                //       ObservableWrapper.subscribe(http.request(url, {method: RequestMethods.GET}), res =>
                //       {
                //         expect(res.text()).toBe('base response');
                //         async.done();
                //       });
                //     }));
            });
            test_lib_1.describe('.get()', function () {
                test_lib_1.it('should perform a get request for given url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(backend.connections, function (c) {
                        test_lib_1.expect(c.request.method).toBe(http_1.RequestMethods.GET);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    async_1.ObservableWrapper.subscribe(http.get(url), function (res) { });
                }));
            });
            test_lib_1.describe('.post()', function () {
                test_lib_1.it('should perform a post request for given url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(backend.connections, function (c) {
                        test_lib_1.expect(c.request.method).toBe(http_1.RequestMethods.POST);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    async_1.ObservableWrapper.subscribe(http.post(url, 'post me'), function (res) { });
                }));
                test_lib_1.it('should attach the provided body to the request', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var body = 'this is my post body';
                    async_1.ObservableWrapper.subscribe(backend.connections, function (c) {
                        test_lib_1.expect(c.request.text()).toBe(body);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    async_1.ObservableWrapper.subscribe(http.post(url, body), function (res) { });
                }));
            });
            test_lib_1.describe('.put()', function () {
                test_lib_1.it('should perform a put request for given url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(backend.connections, function (c) {
                        test_lib_1.expect(c.request.method).toBe(http_1.RequestMethods.PUT);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    async_1.ObservableWrapper.subscribe(http.put(url, 'put me'), function (res) { });
                }));
                test_lib_1.it('should attach the provided body to the request', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var body = 'this is my put body';
                    async_1.ObservableWrapper.subscribe(backend.connections, function (c) {
                        test_lib_1.expect(c.request.text()).toBe(body);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    async_1.ObservableWrapper.subscribe(http.put(url, body), function (res) { });
                }));
            });
            test_lib_1.describe('.delete()', function () {
                test_lib_1.it('should perform a delete request for given url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(backend.connections, function (c) {
                        test_lib_1.expect(c.request.method).toBe(http_1.RequestMethods.DELETE);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    async_1.ObservableWrapper.subscribe(http.delete(url), function (res) { });
                }));
            });
            test_lib_1.describe('.patch()', function () {
                test_lib_1.it('should perform a patch request for given url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(backend.connections, function (c) {
                        test_lib_1.expect(c.request.method).toBe(http_1.RequestMethods.PATCH);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    async_1.ObservableWrapper.subscribe(http.patch(url, 'this is my patch body'), function (res) { });
                }));
                test_lib_1.it('should attach the provided body to the request', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var body = 'this is my patch body';
                    async_1.ObservableWrapper.subscribe(backend.connections, function (c) {
                        test_lib_1.expect(c.request.text()).toBe(body);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    async_1.ObservableWrapper.subscribe(http.patch(url, body), function (res) { });
                }));
            });
            test_lib_1.describe('.head()', function () {
                test_lib_1.it('should perform a head request for given url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(backend.connections, function (c) {
                        test_lib_1.expect(c.request.method).toBe(http_1.RequestMethods.HEAD);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    async_1.ObservableWrapper.subscribe(http.head(url), function (res) { });
                }));
            });
            test_lib_1.describe('searchParams', function () {
                test_lib_1.it('should append search params to url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    var params = new http_1.URLSearchParams();
                    params.append('q', 'puppies');
                    async_1.ObservableWrapper.subscribe(backend.connections, function (c) {
                        test_lib_1.expect(c.request.url).toEqual('https://www.google.com?q=puppies');
                        backend.resolveAllConnections();
                        async.done();
                    });
                    async_1.ObservableWrapper.subscribe(http.get('https://www.google.com', new http_1.RequestOptions({ search: params })), function (res) { });
                }));
                test_lib_1.it('should append string search params to url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(backend.connections, function (c) {
                        test_lib_1.expect(c.request.url).toEqual('https://www.google.com?q=piggies');
                        backend.resolveAllConnections();
                        async.done();
                    });
                    async_1.ObservableWrapper.subscribe(http.get('https://www.google.com', new http_1.RequestOptions({ search: 'q=piggies' })), function (res) { });
                }));
                test_lib_1.it('should produce valid url when url already contains a query', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(backend.connections, function (c) {
                        test_lib_1.expect(c.request.url).toEqual('https://www.google.com?q=angular&as_eq=1.x');
                        backend.resolveAllConnections();
                        async.done();
                    });
                    async_1.ObservableWrapper.subscribe(http.get('https://www.google.com?q=angular', new http_1.RequestOptions({ search: 'as_eq=1.x' })), function (res) { });
                }));
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=http_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();