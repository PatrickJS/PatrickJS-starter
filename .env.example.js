/**
 * This file contains all variables dependent of local environment (like dev, test, production)
 *
 * Copy this file to './.env.js' and modify variables in Env
 *
 * If some of below variable is NULL then that variable feature is off
 */

var Env = {
    GOOGLE_ANALAYTICS_TRACKING_ID : null,           // e.g. 'XX-XXXXXXXX-X',
    API_URL: 'http://example.com/api/v1/',  // base url for backend API used in app services
    EXAMPLE_VARIABLE: 'some_value'
};

module.exports = Env;
