
define([
	// publish
    './purchase-publish/publish-city.directive',
    './purchase-publish/publish-city.service',
    // process
    './purchase-process/logistics',
    './purchase-process/logistics-delivered.filter',
    './purchase-process/logistics-finished.filter',
    './purchase-process/offer',
    './purchase-process/order-paying.filter',
    './purchase-process/order',
    // list
    './purchase-list/list',
    './purchase-list/list-filter.directive',
    './purchase-list/list-route.directive',
    './purchase-list/list-logisticsShow.filter',
    './purchase-list/list-offerShow.filter',
    // home
    './home/home'
    ], function() {});
