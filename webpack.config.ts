/**
 * @author: @AngularClass
 */

// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'production':
    module.exports = require('./config/webpack.prod')();
    break;
  case 'testing':
    module.exports = require('./config/webpack.test')();
    break;
  default:
    module.exports = require('./config/webpack.dev')();
}
