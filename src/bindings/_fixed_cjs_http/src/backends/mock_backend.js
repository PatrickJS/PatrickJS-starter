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
var di_1 = require('angular2/di');
var static_request_1 = require('../static_request');
var enums_1 = require('../enums');
var interfaces_1 = require('../interfaces');
var async_1 = require('angular2/src/facade/async');
var lang_1 = require('angular2/src/facade/lang');
var lang_2 = require('angular2/src/facade/lang');
/**
 *
 * Mock Connection to represent a {@link Connection} for tests.
 *
 **/
var MockConnection = (function () {
    function MockConnection(req) {
        this.response = new async_1.EventEmitter();
        this.readyState = enums_1.ReadyStates.OPEN;
        this.request = req;
    }
    /**
     * Changes the `readyState` of the connection to a custom state of 5 (cancelled).
     */
    MockConnection.prototype.dispose = function () {
        if (this.readyState !== enums_1.ReadyStates.DONE) {
            this.readyState = enums_1.ReadyStates.CANCELLED;
        }
    };
    /**
     * Sends a mock response to the connection. This response is the value that is emitted to the
     * {@link EventEmitter} returned by {@link Http}.
     *
     * #Example
     *
     * ```
     * var connection;
     * backend.connections.subscribe(c => connection = c);
     * http.request('data.json').subscribe(res => console.log(res.text()));
     * connection.mockRespond(new Response('fake response')); //logs 'fake response'
     * ```
     *
     */
    MockConnection.prototype.mockRespond = function (res) {
        if (this.readyState === enums_1.ReadyStates.DONE || this.readyState === enums_1.ReadyStates.CANCELLED) {
            throw new lang_2.BaseException('Connection has already been resolved');
        }
        this.readyState = enums_1.ReadyStates.DONE;
        async_1.ObservableWrapper.callNext(this.response, res);
        async_1.ObservableWrapper.callReturn(this.response);
    };
    /**
     * Not yet implemented!
     *
     * Sends the provided {@link Response} to the `downloadObserver` of the `Request`
     * associated with this connection.
     */
    MockConnection.prototype.mockDownload = function (res) {
        // this.request.downloadObserver.onNext(res);
        // if (res.bytesLoaded === res.totalBytes) {
        //   this.request.downloadObserver.onCompleted();
        // }
    };
    // TODO(jeffbcross): consider using Response type
    /**
     * Emits the provided error object as an error to the {@link Response} {@link EventEmitter}
     * returned
     * from {@link Http}.
     */
    MockConnection.prototype.mockError = function (err) {
        // Matches XHR semantics
        this.readyState = enums_1.ReadyStates.DONE;
        async_1.ObservableWrapper.callThrow(this.response, err);
        async_1.ObservableWrapper.callReturn(this.response);
    };
    MockConnection = __decorate([
        lang_2.IMPLEMENTS(interfaces_1.Connection), 
        __metadata('design:paramtypes', [static_request_1.Request])
    ], MockConnection);
    return MockConnection;
})();
exports.MockConnection = MockConnection;
/**
 * A mock backend for testing the {@link Http} service.
 *
 * This class can be injected in tests, and should be used to override bindings
 * to other backends, such as {@link XHRBackend}.
 *
 * #Example
 *
 * ```
 * import {MockBackend, DefaultOptions, Http} from 'http/http';
 * it('should get some data', inject([AsyncTestCompleter], (async) => {
 *   var connection;
 *   var injector = Injector.resolveAndCreate([
 *     MockBackend,
 *     bind(Http).toFactory((backend, defaultOptions) => {
 *       return new Http(backend, defaultOptions)
 *     }, [MockBackend, DefaultOptions])]);
 *   var http = injector.get(Http);
 *   var backend = injector.get(MockBackend);
 *   //Assign any newly-created connection to local variable
 *   backend.connections.subscribe(c => connection = c);
 *   http.request('data.json').subscribe((res) => {
 *     expect(res.text()).toBe('awesome');
 *     async.done();
 *   });
 *   connection.mockRespond(new Response('awesome'));
 * }));
 * ```
 *
 * This method only exists in the mock implementation, not in real Backends.
 **/
var MockBackend = (function () {
    function MockBackend() {
        var _this = this;
        this.connectionsArray = [];
        this.connections = new async_1.EventEmitter();
        async_1.ObservableWrapper.subscribe(this.connections, function (connection) { return _this.connectionsArray.push(connection); });
        this.pendingConnections = new async_1.EventEmitter();
    }
    /**
     * Checks all connections, and raises an exception if any connection has not received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     */
    MockBackend.prototype.verifyNoPendingRequests = function () {
        var pending = 0;
        async_1.ObservableWrapper.subscribe(this.pendingConnections, function (c) { return pending++; });
        if (pending > 0)
            throw new lang_2.BaseException(pending + " pending connections to be resolved");
    };
    /**
     * Can be used in conjunction with `verifyNoPendingRequests` to resolve any not-yet-resolve
     * connections, if it's expected that there are connections that have not yet received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     */
    MockBackend.prototype.resolveAllConnections = function () {
        async_1.ObservableWrapper.subscribe(this.connections, function (c) { return c.readyState = 4; });
    };
    /**
     * Creates a new {@link MockConnection}. This is equivalent to calling `new
     * MockConnection()`, except that it also will emit the new `Connection` to the `connections`
     * emitter of this `MockBackend` instance. This method will usually only be used by tests
     * against the framework itself, not by end-users.
     */
    MockBackend.prototype.createConnection = function (req) {
        if (!lang_1.isPresent(req) || !(req instanceof static_request_1.Request)) {
            throw new lang_2.BaseException("createConnection requires an instance of Request, got " + req);
        }
        var connection = new MockConnection(req);
        async_1.ObservableWrapper.callNext(this.connections, connection);
        return connection;
    };
    MockBackend = __decorate([
        di_1.Injectable(),
        lang_2.IMPLEMENTS(interfaces_1.ConnectionBackend), 
        __metadata('design:paramtypes', [])
    ], MockBackend);
    return MockBackend;
})();
exports.MockBackend = MockBackend;
//# sourceMappingURL=mock_backend.js.map