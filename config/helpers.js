/**
 * @author: @AngularClass
 */
var path = require('path');
// Helper functions
var ROOT = path.resolve(__dirname, '..');
var root = path.join.bind(path, ROOT);

exports.root = root;
