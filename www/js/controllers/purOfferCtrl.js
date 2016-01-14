
define(['./module'], function(controllers) {
	controllers.controller('purOfferCtrl',
		['$scope', 'httpService', '$state','$stateParams',
		function($scope, httpService, $state, $stateParams){

		// 最后一个item的id
		var baseUrl = 'http://192.168.1.154:8083/order/getPurQuotations/';
		var id =  $stateParams.id;
	    // 初始化
	    httpService.get(baseUrl + id)
	    .then(function(data) {
	    	var datas = data.data;
	    	$scope.list = datas;
	    });
	    
	    httpService.get('http://192.168.1.154:8083/order/getByOrderName/' + id)
	    .then(function(data) {
	    	var datas = data.data;
	    	$scope.product = datas;
	    });

	    // 选择商家
	    $scope.order = function() {
	    	var radios = document.getElementsByName('choiceOffer');
	    	var choice;
	    	for(var i = 0; i < radios.length; i++) {
	    		if(radios[i].checked) {
	    			choice = radios[i].value;
	    		}
	    	}
	    	if(choice !== null && choice !== undefined) {
		    	httpService.post('http://192.168.1.154:8083/order/chooseOrderQuotation', {"orderName": id, "quotationId": choice})
			    .then(function(data) {
			    	$state.go('purchase.order', {'id': id});
			    });
	    	}
	    };

	    // 换一批商家
	    $scope.changeOffer = function()　{
	    	httpService.get('./json/purchase-offerChange.json')
		    .then(function(data) {
		    	var datas = data.data;
		    	$scope.list = datas.offer;
		    });
	    };

	}]);
});