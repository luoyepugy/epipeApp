
define(['./module'], function(controllers) {
	controllers.controller('purOrderCtrl',
		['$scope', 'httpService', '$stateParams',
		function($scope, httpService, $stateParams){

		var baseUrl = '/order/getByOrderName/';
		var id =  $stateParams.id;

	    // 初始化
	    var promise = httpService.getDatas('GET',baseUrl +id);
	    promise.then(function(data) {
	    	var datas = data.data;
	    	$scope.product = datas;
	    	$scope.purchase = datas.purchaser;
	    	$scope.supplier = datas.supplier;
	    });

	}]);
});