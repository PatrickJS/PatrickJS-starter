// @AngularClass

exports.config = {
  baseUrl: 'http://localhost:8080/',

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

  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: [
    'test/**/*.e2e.js'
  ],

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  }

};
