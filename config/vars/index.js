const commonConfig = require('./common');

module.exports = function (env, prefix) {
  prefix = prefix || 'VARS';
  prefix = prefix + '.';
  const _ = Object.assign({}, commonConfig, require(`./${env}`));
  const config = {};
  Object.keys(_).map(function (k) {config[prefix +k] = JSON.stringify(_[k]);});
  return config;
}
