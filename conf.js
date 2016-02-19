exports.config = {
  allScriptsTimeout: 11000,

  SeleniumAddress: 'http://localhost:4444/wd/hub',

  directConnect: true,

  baseUrl: 'http://localhost:8100',

  specs: ['./www/test/e2e/*.e2e.js'],

  capabilities: {
    'browserName': 'chrome'
  },

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
