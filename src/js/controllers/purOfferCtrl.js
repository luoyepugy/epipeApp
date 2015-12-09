
define(['./module'], function(controllers) {
	controllers.controller('purOfferCtrl',
		['$scope', '$ionicLoading', 'httpService', 'messageService',
		function($scope, $ionicLoading, httpService, messageService){

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
	    });

	    // 选择商家
	    $scope.order = function() {
	    	console.log($scope.choiceOffer.value);
	    };

	    // 换一批商家
	    $scope.changeOffer = function()　{
	    	// 预加载
		    $ionicLoading.show({
		        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
		        duration: 3000
		    });
	    	httpService.getData('./json/purchase-offerChange.json')
		    .then(function(data) {
		    	var datas = data.data;
		    	$ionicLoading.hide();
		    	$scope.list = datas.offer;
		    }, function(data) {
		    	messageService.show(data);
		    });
	    };

	}]);
});