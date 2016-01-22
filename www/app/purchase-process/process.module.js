
define([
	'angular',
	'./logistics-delivered.filter',
	'./logistics-finished.filter',
	'./logistics',
	'./offer',
	'./order-paying.filter',
	'./order'
	], function(angular) {
	'use strict';
	return angular.module('myApp.purchaseProcess', ['myApp.purchaseList', 'myApp.purchasePublish']);
});