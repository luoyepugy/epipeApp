
define(['./module'], function(controllers) {
	controllers.controller('purOrderCtrl',
		['$scope', '$ionicLoading', 'httpService', 'messageService', 
		function($scope, $ionicLoading, httpService, messageService){

		var baseUrl = './json/purchase-order.json';

	    // 初始化
	    var promise = httpService.getData(baseUrl);
	    promise.then(function(data) {
	    	var datas = data.data;
	    	$scope.product = datas.product;
	    	$scope.offer = datas.offer;
	    	$scope.purchase = datas.purchase;
	    });

	}]);
});