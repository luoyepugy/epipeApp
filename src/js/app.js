

define(['angular', './controllers/index', './services/index'], function(angular, controllers, services){
    return angular.module('myApp',['ionic', 'myApp.controllers', 'myApp.services']);	
});
