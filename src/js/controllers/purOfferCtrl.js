
define(['./module'], function(controllers) {
	controllers.controller('purOfferCtrl',
		['$scope', '$ionicLoading', 'httpService', 'messageService', '$state',
		function($scope, $ionicLoading, httpService, messageService, $state){

		// 最后一个item的id
		var baseUrl = './json/purchase-offer.json';

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
	    	var radios = document.getElementsByName('choiceOffer');
	    	var choice;
	    	for(var i = 0; i < radios.length; i++) {
	    		if(radios[i].checked) {
	    			choice = radios[i].value;
	    		}
	    	}
	    	if(choice !== null && choice !== undefined) {
	    		// 预加载
			    $ionicLoading.show({
			        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
			        duration: 3000
			    });
		    	httpService.getData('./json/login.json', {"choiceId": choice})
			    .then(function(data) {
			    	$ionicLoading.hide();
			    	$state.go('purchase.order');
			    }, function(data) {
			    	messageService.show(data);
			    });
	    	}
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