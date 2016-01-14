

define(['angular', './controllers/index', './directives/index', './services/index', './filters/index'], 
	function(angular, controllers, directives, services, filters){
    return angular.module('myApp',['ionic', 'ngCordova', 'myApp.controllers', 'myApp.directives', 'myApp.services', 'myApp.filters']);	
});
