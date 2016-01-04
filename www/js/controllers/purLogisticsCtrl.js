
define(['./module'], function(controllers) {
	controllers.controller('purLogisticsCtrl',['$scope', '$ionicLoading', 'httpService', '$stateParams',function($scope, $ionicLoading, httpService){
		var baseUrl = './json/purchase-logistics.json';

	    // 初始化
	    var promise = httpService.getData(baseUrl);
	    promise.then(function(data) {
	    	var datas = data.data;
	    	$scope.product = datas.product;
	    	$scope.list = datas.logistics;
	    });
	}]);
});