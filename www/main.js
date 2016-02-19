
requirejs.config({
    paths: {
        angular: "lib/ionic/js/ionic.bundle",
        domReady: "lib/domReady/domReady",
        zepto: "lib/zepto/zepto.min",
        ngCordova: 'lib/ngCordova/dist/ng-cordova.min',
        angularMocks: 'lib/angular-mocks/angular-mocks',
        cordova: 'cordova'
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
    deps: ['./bootstrap']
});
