'use strict';var test_lib_1 = require('angular2/test_lib');
var base_request_options_1 = require('http/src/base_request_options');
var enums_1 = require('http/src/enums');
function main() {
    test_lib_1.describe('BaseRequestOptions', function () {
        test_lib_1.it('should create a new object when calling merge', function () {
            var options1 = new base_request_options_1.BaseRequestOptions();
            var options2 = options1.merge(new base_request_options_1.RequestOptions({ method: enums_1.RequestMethods.DELETE }));
            test_lib_1.expect(options2).not.toBe(options1);
            test_lib_1.expect(options2.method).toBe(enums_1.RequestMethods.DELETE);
        });
        test_lib_1.it('should retain previously merged values when merging again', function () {
            var options1 = new base_request_options_1.BaseRequestOptions();
            var options2 = options1.merge(new base_request_options_1.RequestOptions({ method: enums_1.RequestMethods.DELETE }));
            var options3 = options2.merge(new base_request_options_1.RequestOptions({ mode: enums_1.RequestModesOpts.NoCors }));
            test_lib_1.expect(options3.mode).toBe(enums_1.RequestModesOpts.NoCors);
            test_lib_1.expect(options3.method).toBe(enums_1.RequestMethods.DELETE);
        });
    });
}
exports.main = main;
//# sourceMappingURL=base_request_options_spec.js.map
 main(); 
var parse5Adapter = require('angular2/src/dom/parse5_adapter'); parse5Adapter.Parse5DomAdapter.makeCurrent();