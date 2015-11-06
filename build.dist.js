var fse = require('fs-extra');
var path = require('path');
var TEMP = './.build.dist.tmp';
var DIST = './dist';
var PUBLIC = './src/public';
var BUILD = './__build__';

/**
 * THIS IS SYNC o_O
 */

// Clear temp
fse.removeSync(TEMP);

// Do work in temp
fse.copySync(PUBLIC, TEMP, {clobber:true}); 
fse.copySync(BUILD, path.join(TEMP,BUILD));

// Clear dist
fse.removeSync(DIST);

// Do work in dist
fse.copySync(TEMP, DIST);

// Clean up temp
fse.removeSync(TEMP);