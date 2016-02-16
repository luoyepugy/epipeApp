exports.config = {
  allScriptsTimeout: 11000,

  baseUrl: 'http://localhost:8100',

  SeleniumAddress: 'http://localhost:4444/wd/hub',
  directConnect: true,
  specs: ['./www/purchase/**/*.e2e.js'],

  capabilities: {
    'browserName': 'chrome',
    'platform': 'LINUX'
  },

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
