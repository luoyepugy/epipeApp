
define(['./module'], function(controllers) {
	controllers.controller('purListCtrl',
		['$scope', 'httpService', 'messageService', '$state',
		function($scope, httpService, messageService, $state){

		// 更多数据判断
		$scope.hasMore = true;
		$scope.list = [];
		
		var count = 10,
			oldCount = $scope.list.length;
		var baseUrl = 'http://192.168.1.154:8083/order/getMyOldOrders/';
		
		var oldMaxCount = 0;
	    // 初始化
	    var promise = httpService.get(baseUrl + count +'/' + $scope.list.length +'/' + oldMaxCount);
	    promise.then(function(data) {
	    	var datas = data.data;
	    	$scope.list = datas.orders;
	    	oldMaxCount = datas.maxCount;
	    });

	    
	    // 刷新
	    $scope.doRefresh = function() {
	    	var promise = httpService.get('http://192.168.1.154:8083/order/getMyNewOrders/' + $scope.list.length +'/' + oldMaxCount);
		    promise.then(function(data) {
		    	var datas = data.data;
		    	oldMaxCount = datas.maxCount;
		    	if(datas > 0) {
		    		$scope.list = data.data.orders;
		    	} else {
		    		messageService.show('没有更多新的数据');
		    	}
		    	$scope.$broadcast('scroll.refreshComplete');
		    });
	    };


	    // 加载更多
	    $scope.loadMore = function() {
	    	var promise = httpService.get(baseUrl + count +'/' + $scope.list.length +'/' + oldMaxCount);
		    promise.then(function(data) {
		    	var datas = data.data;
		    	oldMaxCount = datas.maxCount;
	            if(datas.length === 0) {
	            	$scope.hasMore = false;
	            	messageService.show('没有更多新的数据');
	            } else {
	            	$scope.list = data.data.orders;
	            }
	            $scope.$broadcast('scroll.infiniteScrollComplete');
		    });
	    };
	}]);
});