
requirejs.config({
    paths: {
        angular: "lib/ionic/js/ionic.bundle",
        domReady: "lib/requirejs-domready/domReady",
        zepto: "lib/zepto/zepto.min",
        ngCordova: 'lib/ngCordova/dist/ng-cordova.min',
        ionicDeploy: 'lib/ionic-service-deploy-private/ionic-deploy',
        ionicCore: 'lib/ionic-service-core/ionic-core',
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
            deps: ['angular', 'ionicCore', 'ionicDeploy'],
            exports: 'ngCordova'
        },
        cordova: {
            deps: ['ngCordova'],
            exports: 'cordova'
        },
        ionicCore: {
            deps: ['angular'],
            exports: 'ionicCore'
        },
        ionicDeploy: {
            deps: ['ionicCore'],
            exports: 'ionicDeploy'
        }
    },
    deps: ['./bootstrap']
});
