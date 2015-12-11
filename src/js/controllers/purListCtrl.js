
define(['./module'], function(controllers) {
	controllers.controller('purListCtrl',
		['$scope', 'httpService', 'messageService', '$state',
		function($scope, httpService, messageService, $state){

		// 最后一个item的id
		var lastId = 0;
		var baseUrl = './json/purchase-list.json';
		// 更多数据判断
		$scope.hasMore = true;
		$scope.list = [];
		
	    // 初始化
	    var promise = httpService.getData(baseUrl);
	    promise.then(function(data) {
	    	var datas = data.data.items;
	    	$scope.list = datas;
	    	// lastId = datas[datas.length-1].id;
	    });

	    // 刷新
	    $scope.doRefresh = function() {
	    	var promise = httpService.getData(baseUrl, {'status': 'refresh'});
		    promise.then(function(data) {
		    	var datas = data.data.items;
		    	$scope.list = datas;
		    	// lastId = datas[datas.length-1].id;
		    	$scope.$broadcast('scroll.refreshComplete');
		    });
	    };

	    // 加载更多
	    $scope.loadMore = function() {
	    	var promise = httpService.getData(baseUrl, {'status': 'loadmore', 'id': lastId});
		    promise.then(function(data) {
		    	var datas = data.data.items;
		    	for(var i = 0; i < datas.length; i++) {
	            	$scope.list.push(datas[i]);
	            	// lastId = datas[datas.length-1].id;
	            }
	            if(data.length === 0) {
	            	$scope.hasMore = false;
	            }
	            $scope.$broadcast('scroll.infiniteScrollComplete');
		    });
	    };
	}]);
});