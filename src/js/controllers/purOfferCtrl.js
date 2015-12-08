
define(['./module'], function(controllers) {
	controllers.controller('purOfferCtrl',['$scope', '$ionicLoading', 'httpService', function($scope, $ionicLoading, httpService){

		// 最后一个item的id
		var lastId = 0;
		var baseUrl = './json/purchase-offer.json';
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
	    	$scope.list = datas.offer;
	    	// lastId = datas[datas.length-1].id;
	    });
	}]);
});