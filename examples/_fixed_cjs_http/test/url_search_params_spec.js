'use strict';var test_lib_1 = require('angular2/test_lib');
var url_search_params_1 = require('http/src/url_search_params');
function main() {
    test_lib_1.describe('URLSearchParams', function () {
        test_lib_1.it('should conform to spec', function () {
            var paramsString = "q=URLUtils.searchParams&topic=api";
            var searchParams = new url_search_params_1.URLSearchParams(paramsString);
            // Tests borrowed from example at
            // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
            // Compliant with spec described at https://url.spec.whatwg.org/#urlsearchparams
            test_lib_1.expect(searchParams.has("topic")).toBe(true);
            test_lib_1.expect(searchParams.has("foo")).toBe(false);
            test_lib_1.expect(searchParams.get("topic")).toEqual("api");
            test_lib_1.expect(searchParams.getAll("topic")).toEqual(["api"]);
            test_lib_1.expect(searchParams.get("foo")).toBe(null);
            searchParams.append("topic", "webdev");
            test_lib_1.expect(searchParams.getAll("topic")).toEqual(["api", "webdev"]);
            test_lib_1.expect(searchParams.toString()).toEqual("q=URLUtils.searchParams&topic=api&topic=webdev");
            searchParams.delete("topic");
            test_lib_1.expect(searchParams.toString()).toEqual("q=URLUtils.searchParams");
            // Test default constructor
            test_lib_1.expect(new url_search_params_1.URLSearchParams().toString()).toBe("");
        });
        test_lib_1.it('should support map-like merging operation via setAll()', function () {
            var mapA = new url_search_params_1.URLSearchParams('a=1&a=2&a=3&c=8');
            var mapB = new url_search_params_1.URLSearchParams('a=4&a=5&a=6&b=7');
            mapA.setAll(mapB);
            test_lib_1.expect(mapA.has('a')).toBe(true);
            test_lib_1.expect(mapA.has('b')).toBe(true);
            test_lib_1.expect(mapA.has('c')).toBe(true);
            test_lib_1.expect(mapA.getAll('a')).toEqual(['4']);
            test_lib_1.expect(mapA.getAll('b')).toEqual(['7']);
            test_lib_1.expect(mapA.getAll('c')).toEqual(['8']);
            test_lib_1.expect(mapA.toString()).toEqual('a=4&c=8&b=7');
        });
        test_lib_1.it('should support multimap-like merging operation via appendAll()', function () {
            var mapA = new url_search_params_1.URLSearchParams('a=1&a=2&a=3&c=8');
            var mapB = new url_search_params_1.URLSearchParams('a=4&a=5&a=6&b=7');
            mapA.appendAll(mapB);
            test_lib_1.expect(mapA.has('a')).toBe(true);
            test_lib_1.expect(mapA.has('b')).toBe(true);
            test_lib_1.expect(mapA.has('c')).toBe(true);
            test_lib_1.expect(mapA.getAll('a')).toEqual(['1', '2', '3', '4', '5', '6']);
            test_lib_1.expect(mapA.getAll('b')).toEqual(['7']);
            test_lib_1.expect(mapA.getAll('c')).toEqual(['8']);
            test_lib_1.expect(mapA.toString()).toEqual('a=1&a=2&a=3&a=4&a=5&a=6&c=8&b=7');
        });
        test_lib_1.it('should support multimap-like merging operation via replaceAll()', function () {
            var mapA = new url_search_params_1.URLSearchParams('a=1&a=2&a=3&c=8');
            var mapB = new url_search_params_1.URLSearchParams('a=4&a=5&a=6&b=7');
            mapA.replaceAll(mapB);
            test_lib_1.expect(mapA.has('a')).toBe(true);
            test_lib_1.expect(mapA.has('b')).toBe(true);
            test_lib_1.expect(mapA.has('c')).toBe(true);
            test_lib_1.expect(mapA.getAll('a')).toEqual(['4', '5', '6']);
            test_lib_1.expect(mapA.getAll('b')).toEqual(['7']);
            test_lib_1.expect(mapA.getAll('c')).toEqual(['8']);
            test_lib_1.expect(mapA.toString()).toEqual('a=4&a=5&a=6&c=8&b=7');
        });
    });
}
exports.main = main;
//# sourceMappingURL=url_search_params_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();