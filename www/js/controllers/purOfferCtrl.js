
define(['./module'], function(controllers) {
	controllers.controller('purOfferCtrl',
		['$scope', 'httpService', '$state','$stateParams', 'messageService',
		function($scope, httpService, $state, $stateParams, messageService){

		// 最后一个item的id
		var id =  $stateParams.id,
			pageIndex = 1,
			count = 3;
		var totalPage = 1;
		var baseUrl = '/order/getPurQuotations/' + id + '/' + pageIndex + '/' + count;
	    // 初始化
	    httpService.getDatas('GET',baseUrl)
	    .then(function(data) {
	    	var datas = data.data;
	    	$scope.list = datas.quotations;
	    	totalPage = datas.totolPage;
	    });
	    
	    httpService.getDatas('GET','/order/getByOrderName/' + id)
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
		    	httpService.getDatas('POST','/order/chooseOrderQuotation', {"orderName": id, "quotationId": choice})
			    .then(function(data) {
			    	$state.go('purchase.order', {'id': id});
			    });
	    	}
	    };

	    // 换一批商家
	    $scope.changeOffer = function()　{
	    	pageIndex += 1;
	    	if(pageIndex <= totalPage) {
	    		httpService.getDatas('GET',baseUrl)
			    .then(function(data) {
			    	var datas = data.data;
			    	$scope.list = datas.quotations;
			    	totalPage = datas.totolPage;
			    });
			    httpService.getDatas('GET','/order/getByOrderName/' + id)
			    .then(function(data) {
			    	var datas = data.data;
			    	$scope.product = datas;
			    });
	    	}　else {
	    		pageIndex -= 1;
	    		if(pageIndex === 1) {
	    			messageService.show('没有更多商家可供选择了');
	    		} else {
	    			pageIndex = 1;
	    			httpService.getDatas('GET','/order/getPurQuotations/' + id + '/' + pageIndex + '/' + count)
				    .then(function(data) {
				    	var datas = data.data;
				    	$scope.list = datas.quotations;
				    	totalPage = datas.totolPage;
				    });
				    httpService.getDatas('GET','/order/getByOrderName/' + id)
				    .then(function(data) {
				    	var datas = data.data;
				    	$scope.product = datas;
				    });
	    		}
	    	}
	    };

	}]);
});