
define(['./module'], function(controllers) {
	controllers.controller('purListCtrl',
		['$scope', 'httpService', 'messageService', '$state',
		function($scope, httpService, messageService, $state){

		// 更多数据判断
		$scope.hasMore = true;
		$scope.list = [];
		
		var count = 10,
			oldCount = $scope.list.length;
		var baseUrl = '/order/getMyOldOrders/';
		
		var oldMaxCount = 0;
	    // 初始化
	    var promise = httpService.getDatas('GET',baseUrl + count +'/' + $scope.list.length +'/' + oldMaxCount);
	    promise.then(function(data) {
	    	var datas = data.data;
	    	$scope.list = datas.orders;
	    	oldMaxCount = datas.maxCount;
	    });

	    
	    // 刷新
	    $scope.doRefresh = function() {
	    	var promise = httpService.getDatas('GET','/order/getMyNewOrders/' + $scope.list.length +'/' + oldMaxCount);
		    promise.then(function(data) {
		    	var datas = data.data;
                oldMaxCount = datas.maxCount;
                $scope.list = datas.orders;
                $scope.$broadcast('scroll.refreshComplete');
		    });
	    };


	    // 加载更多
	    $scope.loadMore = function() {
	    	var promise = httpService.getDatas('GET',baseUrl + count +'/' + $scope.list.length +'/' + oldMaxCount);
		    promise.then(function(data) {
		    	var datas = data.data;
                oldMaxCount = datas.maxCount;
                if(datas.maxCount === $scope.list.length) {
                    $scope.hasMore = false;
                    messageService.show('没有更多数据了');
                } else {
                    $scope.list = datas.orders;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
		    });
	    };
	}]);
});