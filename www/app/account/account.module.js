
define([
	'angular',
	'./user/user.module',
	'./account/login',
	'./account/register',
	'./account/findPwd',
	'./account/resetPwd'
	], function(angular) {
		'use strict';
		return angular.module('myApp.account', ['myApp.user']);
	});