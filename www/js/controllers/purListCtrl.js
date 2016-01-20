
define(['./module'], function(controllers) {
	controllers.controller('purListCtrl',
		['$scope', 'httpService', 'messageService', '$state', '$rootScope',
		function($scope, httpService, messageService, $state, $rootScope){

		// 0 所有
		// 1 报价
		// 2 待支付
		// 3 已支付
		// 4 已发货
		// 5 已完成

		// 更多数据判断
		$scope.hasMore = true;
		$rootScope.purList = [];

		var count = 10,
			oldMaxCount = 0,
			orderState = $rootScope.statusFilter || '所有';
			url = '/order/getMyOldOrders/'　+ count +'/' + $rootScope.purList.length +'/' + oldMaxCount +'/' + orderState;

		console.log(url);
	    // 初始化
	    var promise = httpService.getDatas('GET',url);
	    promise.then(function(data) {
	    	var datas = data.data;
	    	$rootScope.purList = datas.orders;
	    	oldMaxCount = datas.maxCount;
	    });

	    
	    // 刷新
	    $scope.doRefresh = function() {
	    	orderState = $rootScope.statusFilter || '所有';
	    	var url = '/order/getMyNewOrders/' + $rootScope.purList.length +'/' + oldMaxCount +'/' + orderState;
	    	console.log(url);
	    	var promise = httpService.getDatas('GET', url);
		    promise.then(function(data) {
		    	var datas = data.data;
		    	oldMaxCount = datas.maxCount;
		    	$rootScope.purList = data.data.orders;
		    	$scope.$broadcast('scroll.refreshComplete');
		    });
	    };


	    // 加载更多
	    $scope.loadMore = function() {
	    	orderState = $rootScope.statusFilter || '所有';
	    	var url = '/order/getMyOldOrders/'　+ count +'/' + $rootScope.purList.length +'/' + oldMaxCount +'/' + orderState;
	    	console.log(url);
	    	var promise = httpService.getDatas('GET', url);
		    promise.then(function(data) {
		    	var datas = data.data;
		    	oldMaxCount = datas.maxCount;
	            if(datas.maxCount === $rootScope.purList.length) {
	            	$scope.hasMore = false;
	            	messageService.show('没有更多新的数据');
	            } else {
	            	$rootScope.purList = data.data.orders;
	            }
	            $scope.$broadcast('scroll.infiniteScrollComplete');
		    });
	    };
	}]);
});