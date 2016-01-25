(function() {
	'use strict';

define(['./list.module'], function(list) {
	list.controller('listCtrl', listCtrl);

	/* @ngInject */
	function listCtrl($scope, httpService, messageService, $state, $rootScope){
		// 状态------------------------------
		// 所有，报价，待支付，已支付，已发货，已完成
		// ---------------------------------
		var vm = $scope;
			vm.doRefresh = doRefresh;
			vm.loadMore = loadMore;

		// 更多数据判断
		$rootScope.hasMore = true;
		$rootScope.purList = [];

		var count = 10,										// 要请求的数目
			oldMaxCount = 0,								// 旧的最大数目
			orderState = $rootScope.statusFilter || '所有';	// 订单状态

		// 初步加载
		load();

	    function load() {
	    	var url = '/order/getMyOldOrders/'　+ count +'/' + $rootScope.purList.length +'/' + oldMaxCount +'/' + orderState;
	    	httpService.getDatas('GET', url)
		    .then(function(data) {
		    	var datas = data.data;
		    	$rootScope.purList = datas.orders;
		    	oldMaxCount = datas.maxCount;
		    });
	    };
	    	    
	    // 刷新
	    function doRefresh() {
	    	orderState = $rootScope.statusFilter || '所有';
	    	var url = '/order/getMyNewOrders/' + $rootScope.purList.length +'/' + oldMaxCount +'/' + orderState;
	    	// console.log(url);
	    	httpService.getDatas('GET', url)
		    .then(function(data) {
		    	var datas = data.data;
		    	oldMaxCount = datas.maxCount;
		    	$rootScope.purList = datas.orders;
		    	$scope.$broadcast('scroll.refreshComplete');
		    });
	    };

	    // 加载更多
	    function loadMore() {
	    	orderState = $rootScope.statusFilter || '所有';
	    	var url = '/order/getMyOldOrders/'　+ count +'/' + $rootScope.purList.length +'/' + oldMaxCount +'/' + orderState;
	    	// console.log(url);
	    	httpService.getDatas('GET', url)
		    .then(function(data) {
		    	var datas = data.data;
		    	oldMaxCount = datas.maxCount;
	            if(datas.maxCount === $rootScope.purList.length) {
	            	$rootScope.hasMore = false;
	            	messageService.show('没有更多数据了');
	            } else {
	            	$rootScope.purList = datas.orders;
	            }
	            $scope.$broadcast('scroll.infiniteScrollComplete');
		    });
	    };
	};
});

})();
