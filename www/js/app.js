

define(['angular', './controllers/index', './directives/index', './services/index', './filters/index'], 
	function(angular, controllers, directives, services, filters){
		var value = {
			'host': 'http://192.168.1.154:8083'
		};
    return angular.module('myApp',['ionic', 'ngCordova', 'myApp.controllers', 'myApp.directives', 'myApp.services', 'myApp.filters'])
	.value('config', value);	
});
