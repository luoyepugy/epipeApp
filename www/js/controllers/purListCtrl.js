
define(['./module'], function(controllers) {
	controllers.controller('purListCtrl',
		['$scope', 'httpService', 'messageService', '$state',
		function($scope, httpService, messageService, $state){

		// 最后一个item的id
		var lastId = 0,
			firstId = 0;
		var baseUrl = './json/purchase-list.json';
		// 更多数据判断
		$scope.hasMore = true;
		$scope.list = [];
		
	    // 初始化
	    var promise = httpService.get(baseUrl);
	    promise.then(function(data) {
	    	var datas = data.data.items;
	    	$scope.list = datas;
	    });

	    
	    // 刷新
	    $scope.doRefresh = function() {
	    	var length = $scope.list.length;
	    	firstId = $scope.list[0].id;
	    	var promise = httpService.get(baseUrl, {'status': 'refresh', 'id': firstId});
		    promise.then(function(data) {
		    	var datas = data.data.items;
		    	if(datas > 0) {
		    		$scope.list.unshift(datas);
		    	} else {
		    		messageService.show('没有更多新的数据');
		    	}
		    	$scope.$broadcast('scroll.refreshComplete');
		    });
	    };


	    // 加载更多
	    $scope.loadMore = function() {
	    	var length = $scope.list.length;
	    	if(length === 0) {
	    		lastId = null;
	    	} else {
	    		lastId = $scope.list[length - 1].id;
	    	}
	    	var promise = httpService.get('./json/purchase-list2.json', {'status': 'loadmore', 'id': lastId});
		    promise.then(function(data) {
		    	var datas = data.data.items;
	            if(datas.length === 0) {
	            	$scope.hasMore = false;
	            	messageService.show('没有更多新的数据');
	            } else {
	            	for(var i = 0; i < datas.length; i++) {
		            	$scope.list.push(datas[i]);
		            }
	            }
	            $scope.$broadcast('scroll.infiniteScrollComplete');
		    });
	    };
	}]);
});