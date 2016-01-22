
define([
	'angular',
	'./list',
	'./list-filter.directive',
	'./list-route.directive',
	'./logisticsShow.filter',
	'./stateShow.filter',
	'./offerShow.filter',
	], function(angular) {
		'use strict';
		return angular.module('myApp.purchaseList', []);
	});