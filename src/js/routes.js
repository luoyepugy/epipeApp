

define(['./app'], function (app) {
    'use strict';
    return app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    	$stateProvider
    	.state('home', {
		    url: "/home",
		    templateUrl: "views/home.html",
		    controller: 'homeCtrl'
		})
		.state('purchase', {
			url: "/purchase",
		    "abstract": true,
		    templateUrl: "views/purchase/purchase.html"
		})
		.state('purchase.publish', {
		    url: '/publish',
		    views:{
		        'purchase-publish':{
		            templateUrl: "views/purchase/publish.html",
		            controller: 'publishCtrl'
		        }
		    }
		})
		.state('purchase.list', {
		    url: '/list',
		    views:{
		        'purchase-list':{
		            templateUrl: "views/purchase/list.html",
		            controller: 'purchaseListCtrl'
		        }
		    }
		})
		.state('purchase.offer', {
		    url: '/offer',
		    views:{
		        'purchase-list':{
		            templateUrl: "views/purchase/offer.html"
		        }
		    }
		})
		.state('purchase.logistics', {
		    url: '/logistics',
		    views:{
		        'purchase-list':{
		            templateUrl: "views/purchase/logistics.html"
		        }
		    }
		});

		$urlRouterProvider.otherwise('/home');
	}]);
		
});