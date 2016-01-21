
define(['angular', 'domReady', './routes', './config', './app.constant'], function(angular, domReady) {
	'use strict';
	domReady(function() {
		angular.bootstrap(document, ['myApp']);
	});
});