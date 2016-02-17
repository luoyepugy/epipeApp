exports.config = {
  allScriptsTimeout: 11000,

  baseUrl: 'http://localhost:8100',

  SeleniumAddress: 'http://localhost:4444/wd/hub',
  directConnect: true,
  specs: ['./www/test/e2e/*.e2e.js'],

  capabilities: {
    'browserName': 'chrome',
    'platform': 'ANDROID'
  },

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
