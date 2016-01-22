
define(['angular',
	'../purchase-list/list.module',
	'../purchase-publish/publish.module'
	], function(angular, list, publish) {
	'use strict';
	return angular.module('myApp.purchaseProcess', ['myApp.purchaseList', 'myApp.purchasePublish']);
});