/**
 * @author: tipe.io
 */

/**
 * Look in ./config folder for webpack.dev.js
 */
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod')({ metadata: { buildMode: 'production'} });
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test')({ metadata: { buildMode: 'test' } });
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev')({metadata: { buildMode: 'development'} });
}
