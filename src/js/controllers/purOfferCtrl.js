
define(['./module'], function(controllers) {
	controllers.controller('purOfferCtrl',
		['$scope', 'httpService', '$state', '$stateParams',
		function($scope, httpService, $state, $stateParams){

		var id = $stateParams.id;
		// 最后一个item的id
		var baseUrl = './json/purchase-offer.json';

	    // 初始化
	    var promise = httpService.getData(baseUrl);
	    promise.then(function(data) {
	    	var datas = data.data;
	    	$scope.product = datas.product;
	    	$scope.list = datas.offer;
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
		    	httpService.getData('./json/login.json', {"choiceId": choice})
			    .then(function(data) {
			    	$state.go('purchase.order');
			    });
	    	}
	    };

	    // 换一批商家
	    $scope.changeOffer = function()　{
	    	httpService.getData('./json/purchase-offerChange.json')
		    .then(function(data) {
		    	var datas = data.data;
		    	$scope.list = datas.offer;
		    });
	    };

	}]);
});