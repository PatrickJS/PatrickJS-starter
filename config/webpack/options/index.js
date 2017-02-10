/**
 * @author: Michael De Abreu
 *
 * Made for AngularClass
 */


const EVENT = process.env.npm_lifecycle_event || '';
const isDevServer = process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

const COMMON_OPTIONS = {
  HMR: hasProcessFlag('hot'),
  METADATA: {
    title: 'Angular2 Webpack Starter by @gdi2290 from @AngularClass',
    baseUrl: '/',
    isDevServer,
  },
};

const DEV_OPTIONS = {
  ENV: process.env.ENV = process.env.NODE_ENV = 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 3000,
}

const PROD_OPTIONS = {
  ENV: process.env.NODE_ENV = process.env.ENV = 'production',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8080,
}

module.exports = {
  COMMON_OPTIONS,
  DEV_OPTIONS,
  PROD_OPTIONS,
}
