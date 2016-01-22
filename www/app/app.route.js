
define(['app'], function (app) {
    'use strict';
    return app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    	$stateProvider
    	// home
    	.state('home', {
		    url: "/home",
		    templateUrl: "app/others/home.html",
		    controller: 'homeCtrl'
		})
    	// account
		.state('login', {
		    url: '/login',
		    templateUrl: "app/account/login.html"
		})
		.state('register', {
		    url: '/register',
		    cache: 'false',
		    templateUrl: "app/account/register.html",
		    controller: 'registerCtrl'
		})
		.state('findPwd', {
		    url: '/findPwd',
		    templateUrl: "app/account/findPwd.html",
		    controller: 'findPwdCtrl'
		})
		.state('resetPwd', {
		    url: '/resetPwd/:phone/:code',
		    templateUrl: "app/account/resetPwd.html",
		    controller: 'resetPwdCtrl'
		})
		// purchase
		.state('purchase', {
			url: "/purchase",
		    "abstract": true,
		    templateUrl: "app/others/purchase.html"
		})
		.state('purchase.publish', {
		    url: '/publish',
		    views:{
		        'purchase-publish':{
		            templateUrl: "app/purchase-publish/publish.html"
		        }
		    }
		})
		.state('purchase.list', {
		    url: '/list',
		    cache: 'false',
		    views:{
		        'purchase-list':{
		            templateUrl: "app/purchase-list/list.html",
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
		            templateUrl: "app/user/getProfile.html",
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
		            templateUrl: "app/user/changeProfile.html",
		            controller: 'changeProfileCtrl'
		        }
		    }
		})
		.state('user.changePwd', {
		    url: '/changePwd',
		    views:{
		        'user-getProfile':{
		            templateUrl: "app/user/changePwd.html"
		        }
		    }
		})
		
		// purchase-process	
		.state('list.offer', {
		    url: '/offer/:id',
		    cache: 'false',
		    views:{
		        'purchase-list':{
		            templateUrl: "app/purchase-process/offer.html",
		            controller: 'purOfferCtrl'
		        }
		    }
		})
		.state('list.order', {
		    url: '/order/:id',
		    cache: 'false',
		    views:{
		        'purchase-list':{
		            templateUrl: "app/purchase-process/order.html",
		            controller: 'purOrderCtrl'
		        }
		    }
		})
		.state('list.pay', {
		    url: '/payment',
		    views:{
		        'purchase-list':{
		            templateUrl: "app/others/payment.html"
		        }
		    }
		})
		.state('list.payHelp', {
		    url: '/payHelp',
		    views:{
		        'purchase-list':{
		            templateUrl: "app/purchase-process/payHelp.html"
		        }
		    }
		})
		.state('list.logistics', {
		    url: '/logistics/:id',
		    cache: 'false',
		    views:{
		        'purchase-list':{
		            templateUrl: "app/purchase-process/logistics.html",
		            controller: 'purLogisticsCtrl'
		        }
		    }
		});

		$urlRouterProvider.otherwise('/home');
	}]);
		
});