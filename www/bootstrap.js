
define(['angular', 'domReady', './app.route', './app.config', './app.constant'], function(angular, domReady) {
    'use strict';
    domReady(function() {
        angular.bootstrap(document, ['myApp']);
    });
});