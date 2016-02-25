var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

requirejs.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/home/zh/project/epipeApp',

  paths: {
      angular: "www/lib/ionic/js/ionic.bundle",
      domReady: "www/lib/domReady/domReady",
      zepto: "www/lib/zepto/zepto.min",
      ngCordova: 'www/lib/ngCordova/dist/ng-cordova.min',
      cordova: 'www/cordova',
      angularMocks: 'www/lib/angular-mocks/angular-mocks'
　　},
  shim: {
      angular: {
          exports: 'angular'
      },
      zepto: {
          exports: '$'
      },
      ngCordova: {
          deps: ['angular'],
          exports: 'ngCordova'
      },
      cordova: {
          deps: ['ngCordova'],
          exports: 'cordova'
      },
      angularMocks: {
          deps: ['angular'],
          exports: 'angularMocks'
      }
  },

  // dynamically load all test files
  deps: window.__karma__ ? allTestFiles : ['www/bootstrap'],

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
