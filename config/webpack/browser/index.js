/*
 * @author: Michael De Abreu
 *
 * Made for @AngularClass
 */


module.exports = (env) => env.prod
    ? require('./webpack.browser.prod')(env)
    : require('./webpack.browser.dev')(env);
