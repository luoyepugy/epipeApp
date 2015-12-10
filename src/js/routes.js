
define(['./app'], function (app) {
    'use strict';
    return app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    	$stateProvider
    	.state('home', {
		    url: "/home",
		    templateUrl: "views/home.html",
		    controller: 'homeCtrl'
		})

		.state('purchase-login', {
		    url: '/purchase/login',
		    templateUrl: "views/purchase/login.html",
		    controller: 'purLoginCtrl'
		})
		.state('purchase-egister', {
		    url: '/purchase/register',
		    templateUrl: "views/purchase/register.html",
		    controller: 'purRegisterCtrl'
		})

		.state('purchase', {
			url: "/purchase",
		    "abstract": true,
		    templateUrl: "views/purchase/purchase.html"
		})
		.state('purchase.userInfo', {
		    url: '/userInfo',
		    views:{
		        'purchase-userInfo':{
		            templateUrl: "views/purchase/userInfo.html",
		            controller: 'purUserCtrl'
		        }
		    }
		})
		.state('purchase.editUser', {
		    url: '/editUser',
		    views:{
		        'purchase-userInfo':{
		            templateUrl: "views/purchase/editUser.html",
		            controller: 'purUserCtrl'
		        }
		    }
		})
		.state('purchase.publish', {
		    url: '/publish',
		    views:{
		        'purchase-publish':{
		            templateUrl: "views/purchase/publish.html",
		            controller: 'purPublishCtrl'
		        }
		    }
		})
		.state('purchase.list', {
		    url: '/list',
		    views:{
		        'purchase-list':{
		            templateUrl: "views/purchase/list.html",
		            controller: 'purListCtrl'
		        }
		    }
		})
		.state('purchase.offer', {
		    url: '/offer',
		    views:{
		        'purchase-list':{
		            templateUrl: "views/purchase/offer.html",
		            controller: 'purOfferCtrl'
		        }
		    }
		})
		.state('purchase.order', {
		    url: '/order',
		    views:{
		        'purchase-list':{
		            templateUrl: "views/purchase/order.html",
		            controller: 'purOrderCtrl'
		        }
		    }
		})
		.state('purchase.pay', {
		    url: '/pay',
		    views:{
		        'purchase-list':{
		            templateUrl: "views/purchase/pay.html"
		        }
		    }
		})
		.state('purchase.payHelp', {
		    url: '/payHelp',
		    views:{
		        'purchase-list':{
		            templateUrl: "views/purchase/payHelp.html"
		        }
		    }
		})
		.state('purchase.logistics', {
		    url: '/logistics',
		    views:{
		        'purchase-list':{
		            templateUrl: "views/purchase/logistics.html",
		            controller: 'purLogisticsCtrl'
		        }
		    }
		});

		$urlRouterProvider.otherwise('/home');
	}]);
		
});