
requirejs.config({
    paths: {
        angular: "lib/ionic/js/ionic.bundle",
        domReady: "lib/requirejs-domready/domReady",
        zepto: "lib/zepto/zepto.min",
        ngCordova: 'lib/ngCordova/dist/ng-cordova.min',
        cordova: 'cordova',
        app: 'app.module'
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
        }
    },
    deps: ['./bootstrap']
});
