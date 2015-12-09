
requirejs.config({
    paths: {
        angular: "../lib/ionic/js/ionic.bundle",
        domReady: "../lib/requirejs-domready/domReady",
        zepto: "../lib/zepto/zepto.min"
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
