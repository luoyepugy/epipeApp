
define(['./module'], function(controllers) {
	controllers.controller('purLogisticsCtrl', 
		['$scope', 'httpService', '$stateParams','$state',
		function($scope, httpService, $stateParams, $state){

		var baseUrl = 'http://192.168.1.154:8083/order/getLogistics/';
		var id =  $stateParams.id;
	    // 初始化
	    var promise = httpService.get(baseUrl + id);
	    promise.then(function(data) {
	    	var datas = data.data;
	    	$scope.list = datas;
	    	for(i = 0; i < datas.length; i++) {
	    		if(i === 0) {
	    			$scope.list[i].current = true;
		    	} else {
		    		$scope.list[i].current = false;
		    	}
	    	}
	    });

	    httpService.get('http://192.168.1.154:8083/order/getByOrderName/' + id)
	    .then(function(data) {
	    	var datas = data.data;
	    	$scope.product = datas;
	    });

	    $scope.confirmGoods = function() {
	    	httpService.post('http://192.168.1.154:8083/order/finshOrder', {"orderName": id})
		    .then(function(data) {
		    	$state.go('purchase.list');
		    });
	    }

	}]);
});