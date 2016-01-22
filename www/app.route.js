
define(['app'], function (app) {
    'use strict';
    return app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    	$stateProvider
    	// home
    	.state('home', {
		    url: "/home",
		    templateUrl: "others/home.html",
		    controller: 'homeCtrl'
		})
    	// account
		.state('login', {
		    url: '/login',
		    templateUrl: "account/login.html"
		})
		.state('register', {
		    url: '/register',
		    cache: 'false',
		    templateUrl: "account/register.html",
		    controller: 'registerCtrl'
		})
		.state('findPwd', {
		    url: '/findPwd',
		    templateUrl: "account/findPwd.html",
		    controller: 'findPwdCtrl'
		})
		.state('resetPwd', {
		    url: '/resetPwd/:phone/:code',
		    templateUrl: "account/resetPwd.html",
		    controller: 'resetPwdCtrl'
		})
		// purchase
		.state('purchase', {
			url: "/purchase",
		    "abstract": true,
		    templateUrl: "others/purchase.html"
		})
		.state('purchase.publish', {
		    url: '/publish',
		    views:{
		        'purchase-publish':{
		            templateUrl: "purchase-publish/publish.html"
		        }
		    }
		})
		.state('purchase.list', {
		    url: '/list',
		    cache: 'false',
		    views:{
		        'purchase-list':{
		            templateUrl: "purchase-list/list.html",
		            controller: 'listCtrl'
		        }
		    }
		})
		.state('purchase.getProfile', {
		    url: '/user',
		    "abstract": true,
		    cache: 'false',
		    views:{
		        'user-getProfile':{
		            templateUrl: "user/getProfile.html",
		            controller: 'getProfileCtrl'
		        }
		    }
		})

		// user
		.state('user.changeProfile', {
		    url: '/changeProfile',
		    cache: 'false',
		    views:{
		        'user-getProfile':{
		            templateUrl: "user/changeProfile.html",
		            controller: 'changeProfileCtrl'
		        }
		    }
		})
		.state('user.changePwd', {
		    url: '/changePwd',
		    views:{
		        'user-getProfile':{
		            templateUrl: "user/changePwd.html"
		        }
		    }
		})
		
		// purchase-process	
		.state('list.offer', {
		    url: '/offer/:id',
		    cache: 'false',
		    views:{
		        'purchase-list':{
		            templateUrl: "purchase-process/offer.html",
		            controller: 'purOfferCtrl'
		        }
		    }
		})
		.state('list.order', {
		    url: '/order/:id',
		    cache: 'false',
		    views:{
		        'purchase-list':{
		            templateUrl: "purchase-process/order.html",
		            controller: 'purOrderCtrl'
		        }
		    }
		})
		.state('list.pay', {
		    url: '/payment',
		    views:{
		        'purchase-list':{
		            templateUrl: "others/payment.html"
		        }
		    }
		})
		.state('list.payHelp', {
		    url: '/payHelp',
		    views:{
		        'purchase-list':{
		            templateUrl: "others/pay-help.html"
		        }
		    }
		})
		.state('list.logistics', {
		    url: '/logistics/:id',
		    cache: 'false',
		    views:{
		        'purchase-list':{
		            templateUrl: "purchase-process/logistics.html",
		            controller: 'purLogisticsCtrl'
		        }
		    }
		});

		$urlRouterProvider.otherwise('/home');
	}]);
		
});