// @AngularClass

exports.config = {
  baseUrl: 'http://localhost:3000/',

  specs: [
    'test/**/*.e2e.js'
  ],
  exclude: [],

  framework: 'jasmine',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  /**
   * For node v0.12.x
   *
   * One should install chromedriver locally with : ./node_modules/protractor/bin/webdriver-manager update --standalone
   *
   * Otherwise use the chromeDriver option to specify the path to external chromedriver if necessary
   *
   * Example : chromeDriver: '/usr/lib/node_modules/protractor/selenium/chromedriver'
   */
  directConnect: true,


  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *
   */
   useAllAngular2AppRoots: true
};
