'use strict';var headers_1 = require('http/src/headers');
var collection_1 = require('angular2/src/facade/collection');
var test_lib_1 = require('angular2/test_lib');
function main() {
    test_lib_1.describe('Headers', function () {
        test_lib_1.it('should conform to spec', function () {
            // Examples borrowed from https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers
            // Spec at https://fetch.spec.whatwg.org/#dom-headers
            var firstHeaders = new headers_1.Headers(); // Currently empty
            firstHeaders.append('Content-Type', 'image/jpeg');
            test_lib_1.expect(firstHeaders.get('Content-Type')).toBe('image/jpeg');
            var httpHeaders = collection_1.StringMapWrapper.create();
            collection_1.StringMapWrapper.set(httpHeaders, 'Content-Type', 'image/jpeg');
            collection_1.StringMapWrapper.set(httpHeaders, 'Accept-Charset', 'utf-8');
            collection_1.StringMapWrapper.set(httpHeaders, 'X-My-Custom-Header', 'Zeke are cool');
            var secondHeaders = new headers_1.Headers(httpHeaders);
            var secondHeadersObj = new headers_1.Headers(secondHeaders);
            test_lib_1.expect(secondHeadersObj.get('Content-Type')).toBe('image/jpeg');
        });
        test_lib_1.describe('initialization', function () {
            test_lib_1.it('should merge values in provided dictionary', function () {
                var map = collection_1.StringMapWrapper.create();
                collection_1.StringMapWrapper.set(map, 'foo', 'bar');
                var headers = new headers_1.Headers(map);
                test_lib_1.expect(headers.get('foo')).toBe('bar');
                test_lib_1.expect(headers.getAll('foo')).toEqual(['bar']);
            });
        });
        test_lib_1.describe('.set()', function () {
            test_lib_1.it('should clear all values and re-set for the provided key', function () {
                var map = collection_1.StringMapWrapper.create();
                collection_1.StringMapWrapper.set(map, 'foo', 'bar');
                var headers = new headers_1.Headers(map);
                test_lib_1.expect(headers.get('foo')).toBe('bar');
                test_lib_1.expect(headers.getAll('foo')).toEqual(['bar']);
                headers.set('foo', 'baz');
                test_lib_1.expect(headers.get('foo')).toBe('baz');
                test_lib_1.expect(headers.getAll('foo')).toEqual(['baz']);
            });
            test_lib_1.it('should convert input array to string', function () {
                var headers = new headers_1.Headers();
                var inputArr = ['bar', 'baz'];
                headers.set('foo', inputArr);
                test_lib_1.expect(/bar, ?baz/g.test(headers.get('foo'))).toBe(true);
                test_lib_1.expect(/bar, ?baz/g.test(headers.getAll('foo')[0])).toBe(true);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=headers_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();