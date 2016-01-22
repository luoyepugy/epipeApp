

define(['angular'], 
    function(angular){
    return 
    	angular.module('myApp',
    		[
    		'ionic',
    		'ngCordova',
    		'myApp.directives',
    		'myApp.services',
    		'myApp.purchaseProcess',
    		'myApp.account',
    		'myApp.others'
    		]);
});
