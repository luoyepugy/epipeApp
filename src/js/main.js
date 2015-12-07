
requirejs.config({
    paths: {
        angular: "../lib/ionic/js/ionic.bundle",
        domReady: "../lib/requirejs-domready/domReady"
　　　　},
    shim: {
        angular: {
            exports: 'angular'
        },
        zepto: {
            exports: '$'
        }
    },
    deps: ['./bootstrap']
});
