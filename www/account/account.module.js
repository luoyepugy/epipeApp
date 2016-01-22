
define(['angular',
	'../user/user.module'
	], function(angular, user) {
		'use strict';
		return angular.module('myApp.account', ['myApp.user']);
	});