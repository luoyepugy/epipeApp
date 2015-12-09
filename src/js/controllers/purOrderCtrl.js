
define(['./module'], function(controllers) {
	controllers.controller('purOrderCtrl',
		['$scope', '$ionicLoading', 'httpService', 'messageService', 
		function($scope, $ionicLoading, httpService, messageService){

		// 最后一个item的id
		var lastId = 0;
		var baseUrl = './json/purchase-order.json';
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
	    	var datas = data.data;
	    	$ionicLoading.hide();
	    	$scope.product = datas.product;
	    	$scope.offer = datas.offer;
	    	$scope.purchase = datas.purchase;
	    });

	}]);
});