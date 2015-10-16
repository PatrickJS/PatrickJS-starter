// @AngularClass

exports.config = {
  baseUrl: 'http://localhost:3000/',

  allScriptsTimeout: 11000,

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
    showTiming: true
  },

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.47.1.jar',

  specs: [
    'test/**/*.e2e.js'
  ],

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  }

};
