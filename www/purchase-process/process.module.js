
define(['angular',
	'../purchase-list/list.module',
	'../purchase-publish/publish.module',
	'../user/user.module',
	'../others/others.module',
	'../account/account.module'
	], function(angular, list, publish, user, others, account) {
	'use strict';
	return angular.module('myApp.purchaseProcess', [
		'myApp.purchaseList', 
		'myApp.purchasePublish',
		'myApp.user',
		'myApp.others',
		'myApp.account'
		]);
});