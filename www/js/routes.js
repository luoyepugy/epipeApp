
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
		    templateUrl: "views/purchase/login.html"
		})
		.state('purchase-register', {
		    url: '/purchase/register',
		    cache: 'false',
		    templateUrl: "views/purchase/register.html",
		    controller: 'purRegisterCtrl'
		})
		.state('purchase-forgetPwd', {
		    url: '/purchase/forgetPwd',
		    templateUrl: "views/purchase/forgetPwd.html",
		    controller: 'purRegisterCtrl'
		})
		.state('purchase-resetPwd', {
		    url: '/purchase/resetPwd',
		    templateUrl: "views/purchase/resetPwd.html"
		})

		.state('purchase', {
			url: "/purchase",
		    "abstract": true,
		    templateUrl: "views/purchase/purchase.html"
		})
		.state('purchase.userInfo', {
		    url: '/userInfo',
		    cache: 'false',
		    views:{
		        'purchase-userInfo':{
		            templateUrl: "views/purchase/userInfo.html",
		            controller: 'purUserInfoCtrl'
		        }
		    }
		})
		.state('purchase.changePwd', {
		    url: '/changePwd',
		    views:{
		        'purchase-userInfo':{
		            templateUrl: "views/purchase/changePwd.html"
		        }
		    }
		})
		.state('purchase.editUser', {
		    url: '/editUser',
		    cache: 'false',
		    views:{
		        'purchase-userInfo':{
		            templateUrl: "views/purchase/editUser.html",
		            controller: 'purUserInfoCtrl'
		        }
		    }
		})
		.state('purchase.publish', {
		    url: '/publish',
		    views:{
		        'purchase-publish':{
		            templateUrl: "views/purchase/publish.html"
		        }
		    }
		})
		.state('purchase.list', {
		    url: '/list',
		    cache: 'false',
		    views:{
		        'purchase-list':{
		            templateUrl: "views/purchase/list.html",
		            controller: 'purListCtrl'
		        }
		    }
		})
		.state('purchase.offer', {
		    url: '/offer/:id',
		    cache: 'false',
		    views:{
		        'purchase-list':{
		            templateUrl: "views/purchase/offer.html",
		            controller: 'purOfferCtrl'
		        }
		    }
		})
		.state('purchase.order', {
		    url: '/order/:id',
		    cache: 'false',
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
		    url: '/logistics/:id',
		    cache: 'false',
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