
define(['angular', 'domReady', './app.route', './app.config'], function(angular, domReady) {
    'use strict';
    domReady(function() {
        angular.bootstrap(document, ['myApp']);
    });
});