

define(['angular', './controllers/index', './directives/index', './services/index', './filters/index'], 
	function(angular, controllers, directives, services, filters){
		var value = {
			'host': 'http://192.168.1.154:8083'
		};
		value.avatar = value.host + '/public/avatar/';
		value.upload = value.host + '/upload';
    return angular.module('myApp',['ionic', 'ngCordova', 'myApp.controllers', 'myApp.directives', 'myApp.services', 'myApp.filters'])
	.value('config', value);	
});
