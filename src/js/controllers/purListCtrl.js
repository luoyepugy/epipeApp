
define(['./module'], function(controllers) {
	controllers.controller('purListCtrl',
		['$scope', '$ionicLoading', 'httpService', 'messageService', '$state',
		function($scope, $ionicLoading, httpService, messageService, $state){

		// 最后一个item的id
		var lastId = 0;
		var baseUrl = './json/purchase-list.json';
		// 更多数据判断
		$scope.hasMore = true;

		// 预加载
	    $ionicLoading.show({
	        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
	        duration: 3000
	    });

	    // 初始化
	    var promise = httpService.getData(baseUrl);
	    promise.then(function(data) {
	    	var datas = data.data.items;
	    	$ionicLoading.hide();
	    	$scope.list = datas;
	    	// lastId = datas[datas.length-1].id;
	    });

	    // 刷新
	    $scope.doRefresh = function() {
	    	var promise = httpService.getData(baseUrl, {'status': 'refresh'});
		    promise.then(function(data) {
		    	var datas = data.data.items;
		    	$ionicLoading.hide();
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

	    // 商家报价
	    $scope.offer = function() {
	    	var id = this.item.id;
			var offerNum = this.item.offerNum;
			if(offerNum > 0) {
				// 预加载
			    $ionicLoading.show({
			        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
			        duration: 3000
			    });
				httpService.getData('./json/login.json', {'id': id})
			    .then(function(data) {
			    	$ionicLoading.hide();
			    	$state.go('purchase.offer');
			    });
			}　else {
				messageService.show('暂时没有商家报价');
			}
	    };

	    // 物流追踪
	    $scope.logistics = function() {
	    	var id = this.item.id;
			// 预加载
		    $ionicLoading.show({
		        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
		        duration: 3000
		    });
			httpService.getData('./json/login.json', {'id': id})
		    .then(function(data) {
		    	$ionicLoading.hide();
		    	$state.go('purchase.logistics');
		    });
	    };

	}]);
});